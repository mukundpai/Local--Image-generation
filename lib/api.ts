// Fooocus API Client - Correct 153-element array based on webui.py ctrls

export type LogLevel = 'info' | 'success' | 'warning' | 'error';

export interface LogEntry {
    id: string;
    timestamp: Date;
    level: LogLevel;
    message: string;
    details?: string;
}

export type LogCallback = (entry: LogEntry) => void;

let logCallback: LogCallback | null = null;

export function setLogCallback(callback: LogCallback) {
    logCallback = callback;
}

function log(level: LogLevel, message: string, details?: string) {
    const entry: LogEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date(),
        level,
        message,
        details,
    };

    console.log(`[${level.toUpperCase()}] ${message}`, details || '');

    if (logCallback) {
        logCallback(entry);
    }

    return entry;
}

const API_BASE = 'http://127.0.0.1:7865';
const WS_BASE = 'ws://127.0.0.1:7865';

export async function checkConnection(): Promise<boolean> {
    log('info', 'Checking connection to Fooocus...');

    try {
        const response = await fetch(`${API_BASE}/`, {
            method: 'GET',
            mode: 'no-cors',
        });
        log('success', 'Connection established');
        return true;
    } catch (error) {
        log('error', 'Connection failed', error instanceof Error ? error.message : 'Unknown error');
        return false;
    }
}

export interface GenerateParams {
    prompt: string;
    negativePrompt?: string;
    style?: string;
    aspectRatio?: string;
    seed?: number;

    // Advanced settings
    performance?: 'Speed' | 'Quality' | 'Extreme Speed';
    imageNumber?: number;
    outputFormat?: 'png' | 'jpg' | 'webp';
    sharpness?: number;
    guidanceScale?: number;

    // Model settings
    baseModel?: string;
    refinerModel?: string;
    refinerSwitch?: number;
    loras?: Array<{ enabled: boolean; model: string; weight: number }>;

    // Sampler settings
    sampler?: string;
    scheduler?: string;
    clipSkip?: number;

    // Advanced
    adaptiveCfg?: number;
    admScalerPositive?: number;
    admScalerNegative?: number;
    admScalerEnd?: number;

    // FreeU
    freeuEnabled?: boolean;
    freeuB1?: number;
    freeuB2?: number;
    freeuS1?: number;
    freeuS2?: number;

    // ControlNet
    controlnetSoftness?: number;
}

function generateSessionHash(): string {
    return Math.random().toString(36).substring(2, 12);
}

export async function generateImage(
    params: GenerateParams,
    onProgress?: (progress: number, message: string) => void
): Promise<string | null> {
    log('info', 'Starting image generation...', `Prompt: "${params.prompt.substring(0, 50)}..."`);

    const sessionHash = generateSessionHash();
    log('info', 'Session created', `Hash: ${sessionHash}`);

    const generateData = buildGenerateData(params);
    log('info', 'Data array built', `${generateData.length} elements`);

    return new Promise((resolve, reject) => {
        try {
            const wsUrl = `${WS_BASE}/queue/join`;
            log('info', 'Connecting to WebSocket...', wsUrl);

            const ws = new WebSocket(wsUrl);
            let hasCompleted = false;

            ws.onopen = () => {
                log('success', 'WebSocket connected');
            };

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    log('info', `Received: ${message.msg}`);

                    switch (message.msg) {
                        case 'send_hash':
                            log('info', 'Sending session hash...');
                            ws.send(JSON.stringify({
                                fn_index: 67,
                                session_hash: sessionHash,
                            }));
                            break;

                        case 'send_data':
                            log('info', 'Sending generation data (153 params)...');
                            ws.send(JSON.stringify({
                                fn_index: 67,
                                session_hash: sessionHash,
                                data: generateData,
                            }));
                            break;

                        case 'estimation':
                            const pos = message.rank ?? 0;
                            log('info', `Queue position: ${pos}`);
                            onProgress?.(5, `Queue position: ${pos}`);
                            break;

                        case 'process_starts':
                            log('info', 'Processing started');
                            onProgress?.(10, 'Processing started...');
                            break;

                        case 'process_generating':
                            log('info', 'Generating...');
                            onProgress?.(50, 'Generating image...');
                            break;

                        case 'process_completed':
                            log('success', 'Generation complete!');
                            hasCompleted = true;

                            const outputData = message.output?.data;
                            log('info', 'Raw output data:', JSON.stringify(outputData));

                            if (outputData) {
                                let imageUrl = extractImageUrl(outputData);

                                if (imageUrl) {
                                    log('success', 'Image extracted!');
                                    onProgress?.(100, 'Complete!');
                                    resolve(imageUrl);
                                } else {
                                    log('warning', 'Could not extract image');
                                    resolve(null);
                                }
                            } else {
                                log('warning', 'No output data');
                                resolve(null);
                            }

                            ws.close();
                            break;

                        case 'queue_full':
                            log('error', 'Queue is full');
                            reject(new Error('Queue is full'));
                            ws.close();
                            break;

                        case 'error':
                            log('error', 'Server error', message.error);
                            reject(new Error(message.error || 'Server error'));
                            ws.close();
                            break;
                    }

                } catch (e) {
                    log('warning', 'Parse error');
                }
            };

            ws.onerror = () => {
                log('error', 'WebSocket error');
                reject(new Error('WebSocket failed'));
            };

            ws.onclose = () => {
                log('info', 'WebSocket closed');
                if (!hasCompleted) resolve(null);
            };

            setTimeout(() => {
                if (!hasCompleted) {
                    log('error', 'Timeout');
                    ws.close();
                    reject(new Error('Timeout'));
                }
            }, 5 * 60 * 1000);

        } catch (error) {
            log('error', 'Failed to start', error instanceof Error ? error.message : 'Unknown');
            reject(error);
        }
    });
}

function extractImageUrl(outputData: any[]): string | null {
    // Based on webui.py generate_clicked function:
    // outputs=[progress_html, progress_window, progress_gallery, gallery]
    // The gallery is at index 3 (4th output)

    log('info', `Output data length: ${outputData?.length}`);

    if (!outputData || outputData.length < 4) {
        log('warning', 'Output data array too short');
        return null;
    }

    const galleryData = outputData[3];
    log('info', `Gallery data type: ${typeof galleryData}, isArray: ${Array.isArray(galleryData)}`);

    if (!galleryData) {
        log('warning', 'Gallery data is null/undefined');
        return null;
    }

    // Gallery data can be:
    // 1. An array of file paths (strings)
    // 2. An array of objects with {name: path} or {path: path}
    // 3. An array of objects with {image: {path: ...}}

    if (Array.isArray(galleryData)) {
        log('info', `Gallery array length: ${galleryData.length}`);

        if (galleryData.length === 0) {
            log('warning', 'Gallery array is empty');
            return null;
        }

        const firstItem = galleryData[0];
        log('info', `First gallery item type: ${typeof firstItem}, value: ${JSON.stringify(firstItem)?.substring(0, 200)}`);

        // Case 1: Direct string path
        if (typeof firstItem === 'string') {
            if (firstItem.startsWith('data:image')) {
                return firstItem;
            }
            // File path - convert to Gradio file URL
            return `${API_BASE}/file=${firstItem}`;
        }

        // Case 2: Object with name/path property
        if (typeof firstItem === 'object' && firstItem !== null) {
            const path = firstItem.name || firstItem.path || firstItem.image?.path || firstItem.image?.name;
            if (path) {
                log('success', `Found image path: ${path}`);
                return `${API_BASE}/file=${path}`;
            }
        }
    }

    log('warning', 'Could not extract image from gallery data');
    return null;
}

// Build EXACTLY 153 elements matching webui.py ctrls order (lines 977-1008)
function buildGenerateData(params: GenerateParams): any[] {
    const data: any[] = [];

    // Line 977: currentTask, generate_image_grid
    data.push(null); // currentTask (state) - index 0
    data.push(false); // generate_image_grid - index 1

    // Line 978-981: Basic generation params
    data.push(params.prompt); // prompt - 2
    data.push(params.negativePrompt || ''); // negative_prompt - 3
    data.push(['Fooocus V2', 'Fooocus Enhance', 'Fooocus Sharp']); // style_selections - 4
    data.push(params.performance || 'Speed'); // performance_selection - 5
    data.push(params.aspectRatio || '1152×896'); // aspect_ratios_selection - 6
    data.push(params.imageNumber || 1); // image_number - 7
    data.push(params.outputFormat || 'png'); // output_format - 8
    data.push(String(params.seed ?? Math.floor(Math.random() * 999999999))); // image_seed - 9
    data.push(false); // read_wildcards_in_order - 10
    data.push(params.sharpness ?? 2.0); // sharpness - 11
    data.push(params.guidanceScale ?? 4.0); // guidance_scale - 12

    // Line 984: base_model, refiner_model, refiner_switch + lora_ctrls
    data.push(params.baseModel || 'juggernautXL_v8Rundiffusion.safetensors'); // base_model - 13
    data.push(params.refinerModel || 'None'); // refiner_model - 14
    data.push(params.refinerSwitch ?? 0.5); // refiner_switch - 15

    // lora_ctrls (5 LoRAs x 3 params each = 15 items)
    const loras = params.loras || [];
    for (let i = 0; i < 5; i++) {
        const lora = loras[i] || { enabled: false, model: 'None', weight: 1.0 };
        data.push(lora.enabled); // lora_enabled
        data.push(lora.model); // lora_model
        data.push(lora.weight); // lora_weight
    }
    // Now at index 31

    // Line 985: input_image_checkbox, current_tab
    data.push(false); // input_image_checkbox - 31
    data.push('uov'); // current_tab - 32

    // Line 986: uov_method, uov_input_image
    data.push('Disabled'); // uov_method - 33
    data.push(null); // uov_input_image - 34

    // Line 987: outpaint_selections, inpaint_input_image, inpaint_additional_prompt, inpaint_mask_image
    data.push([]); // outpaint_selections - 35
    data.push(null); // inpaint_input_image - 36
    data.push(''); // inpaint_additional_prompt - 37
    data.push(null); // inpaint_mask_image - 38

    // Line 988: disable_preview, disable_intermediate_results, disable_seed_increment, black_out_nsfw
    data.push(false, false, false, false); // 39-42

    // Line 989: adm_scaler_positive, adm_scaler_negative, adm_scaler_end, adaptive_cfg, clip_skip
    data.push(params.admScalerPositive ?? 1.5); // 43
    data.push(params.admScalerNegative ?? 0.8); // 44
    data.push(params.admScalerEnd ?? 0.3); // 45
    data.push(params.adaptiveCfg ?? 7.0); // 46
    data.push(params.clipSkip ?? 2.0); // 47

    // Line 990: sampler_name, scheduler_name, vae_name
    data.push(params.sampler || 'dpmpp_2m_sde_gpu'); // 48
    data.push(params.scheduler || 'karras'); // 49
    data.push('Default (model)'); // 50

    // Line 991: overwrite_step, overwrite_switch, overwrite_width, overwrite_height, overwrite_vary_strength
    data.push(-1, -1, -1, -1, -1); // 51-55

    // Line 992: overwrite_upscale_strength, mixing_image_prompt_and_vary_upscale, mixing_image_prompt_and_inpaint
    data.push(-1, false, false); // 56-58

    // Line 993: debugging_cn_preprocessor, skipping_cn_preprocessor, canny_low_threshold, canny_high_threshold
    data.push(false, false, 64.0, 128.0); // 59-62

    // Line 994: refiner_swap_method, controlnet_softness
    data.push('joint'); // 63
    data.push(params.controlnetSoftness ?? 0.25); // 64

    // Line 995: freeu_ctrls (5 items: enabled + 4 values)
    data.push(params.freeuEnabled ?? false); // 65
    data.push(params.freeuB1 ?? 1.01); // 66
    data.push(params.freeuB2 ?? 1.02); // 67
    data.push(params.freeuS1 ?? 0.99); // 68
    data.push(params.freeuS2 ?? 0.95); // 69

    // Line 996: inpaint_ctrls (multiple items for inpaint settings)
    // Based on typical Fooocus setup: inpaint_mode, disable_initial_latent, engine, strength, respective_field, etc.
    // Line 996: inpaint_ctrls (8 items)
    // [debugging_inpaint_preprocessor, inpaint_disable_initial_latent, inpaint_engine, 
    //  inpaint_strength, inpaint_respective_field, inpaint_advanced_masking_checkbox, invert_mask_checkbox, inpaint_erode_or_dilate]
    data.push(false); // debugging_inpaint_preprocessor
    data.push(false); // inpaint_disable_initial_latent
    data.push('v2.6'); // inpaint_engine
    data.push(1.0); // inpaint_strength
    data.push(0.618); // inpaint_respective_field
    data.push(false); // inpaint_advanced_masking_checkbox
    data.push(false); // invert_mask_checkbox
    data.push(0); // inpaint_erode_or_dilate

    // Line 998-999: save_final_enhanced_image_only (if not disable_image_log)
    data.push(false); // save_final_enhanced_image_only - 83

    // Line 1001-1002: save_metadata_to_images, metadata_scheme (if not disable_metadata)
    data.push(false); // save_metadata_to_images - 84
    data.push('fooocus'); // metadata_scheme - 85

    // Line 1004: ip_ctrls (Image Prompt controls - 4 IP adapters x 4 params each = 16 items)
    for (let i = 0; i < 4; i++) {
        data.push(null); // ip_image
        data.push(0.5); // ip_stop_at
        data.push(0.6); // ip_weight
        data.push('ImagePrompt'); // ip_type
    }
    // Now at index 102

    // Line 1005-1007: debugging_dino, dino_erode_or_dilate, debugging_enhance_masks_checkbox,
    //                 enhance_input_image, enhance_checkbox, enhance_uov_method, enhance_uov_processing_order,
    //                 enhance_uov_prompt_type
    data.push(false); // debugging_dino - 102
    data.push(0); // dino_erode_or_dilate - 103
    data.push(false); // debugging_enhance_masks_checkbox - 104
    data.push(null); // enhance_input_image - 105
    data.push(false); // enhance_checkbox - 106
    data.push('Disabled'); // enhance_uov_method - 107
    data.push('Before First Enhancement'); // enhance_uov_processing_order - 108
    data.push('Original Prompts'); // enhance_uov_prompt_type - 109

    // Line 1008: enhance_ctrls (3 enhance tabs x 16 params each = 48 items)
    for (let i = 0; i < 3; i++) {
        data.push(false); // enhance_enabled
        data.push(''); // enhance_mask_dino_prompt_text
        data.push(''); // enhance_prompt
        data.push(''); // enhance_negative_prompt
        data.push('u2net'); // enhance_mask_model
        data.push('full'); // enhance_mask_cloth_category
        data.push('vit_b'); // enhance_mask_sam_model
        data.push(0.25); // enhance_mask_text_threshold
        data.push(0.3); // enhance_mask_box_threshold
        data.push(0); // enhance_mask_sam_max_detections
        data.push(false); // enhance_inpaint_disable_initial_latent
        data.push('None'); // enhance_inpaint_engine
        data.push(1.0); // enhance_inpaint_strength
        data.push(0.618); // enhance_inpaint_respective_field
        data.push(0); // enhance_inpaint_erode_or_dilate
        data.push(false); // enhance_mask_invert
    }

    log('info', `Built data array with ${data.length} elements`);

    return data;
}
