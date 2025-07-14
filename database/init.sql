-- KNOUX VERSA - Database Initialization Script
-- سكريبت تهيئة قاعدة البيانات لنظام KNOUX VERSA

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS knoux_versa;
USE knoux_versa;

-- ================== USERS & AUTHENTICATION ==================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    vip_tier VARCHAR(20) DEFAULT 'free',
    vip_key VARCHAR(255),
    vip_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    daily_usage_count INTEGER DEFAULT 0,
    total_usage_count INTEGER DEFAULT 0,
    preferences JSONB DEFAULT '{}'
);

-- ================== AI SERVICES & PROCESSING ==================
CREATE TABLE IF NOT EXISTS ai_services (
    id SERIAL PRIMARY KEY,
    service_id VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    model_name VARCHAR(255) NOT NULL,
    docker_image VARCHAR(255),
    gpu_required BOOLEAN DEFAULT false,
    memory_limit VARCHAR(20),
    concurrent_limit INTEGER DEFAULT 1,
    estimated_time INTEGER DEFAULT 10000,
    is_vip BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================== PROCESSING REQUESTS & RESULTS ==================
CREATE TABLE IF NOT EXISTS processing_requests (
    id SERIAL PRIMARY KEY,
    request_id VARCHAR(100) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id),
    service_id VARCHAR(100) REFERENCES ai_services(service_id),
    status VARCHAR(50) DEFAULT 'pending',
    priority INTEGER DEFAULT 2,
    is_vip BOOLEAN DEFAULT false,
    image_data_path VARCHAR(500),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    processing_time INTEGER,
    error_message TEXT,
    result_path VARCHAR(500),
    quality_score INTEGER,
    metadata JSONB DEFAULT '{}'
);

-- ================== VIP SERVICES & COMMANDS ==================
CREATE TABLE IF NOT EXISTS vip_requests (
    id SERIAL PRIMARY KEY,
    request_id VARCHAR(100) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id),
    vip_tier VARCHAR(50) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    command_sequence JSONB NOT NULL,
    advanced_settings JSONB DEFAULT '{}',
    is_uncensored BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    processing_time INTEGER,
    final_image_path VARCHAR(500),
    intermediate_steps JSONB DEFAULT '[]',
    quality_metrics JSONB DEFAULT '{}',
    vip_benefits JSONB DEFAULT '[]',
    sadek_signature BOOLEAN DEFAULT false
);

-- ================== ARTISTIC TEMPLATES ==================
CREATE TABLE IF NOT EXISTS artistic_templates (
    id SERIAL PRIMARY KEY,
    template_id VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    thumbnail_url VARCHAR(500),
    description_en TEXT,
    description_ar TEXT,
    is_vip BOOLEAN DEFAULT false,
    style VARCHAR(100),
    mood VARCHAR(100),
    lighting JSONB DEFAULT '{}',
    pose JSONB DEFAULT '{}',
    clothing JSONB DEFAULT '{}',
    background JSONB DEFAULT '{}',
    customizable JSONB DEFAULT '{}',
    ai_models JSONB DEFAULT '{}',
    tags JSONB DEFAULT '[]',
    maturity_rating VARCHAR(50) DEFAULT 'Artistic',
    artistic_level VARCHAR(50) DEFAULT 'Professional',
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================== AI TOOLS COMPREHENSIVE DATABASE ==================
CREATE TABLE IF NOT EXISTS ai_tools (
    id SERIAL PRIMARY KEY,
    tool_id VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    category VARCHAR(100) NOT NULL,
    model_info JSONB DEFAULT '{}',
    features JSONB DEFAULT '[]',
    is_sensitive BOOLEAN DEFAULT false,
    requires_mask BOOLEAN DEFAULT false,
    requires_prompt BOOLEAN DEFAULT false,
    requires_second_image BOOLEAN DEFAULT false,
    input_types JSONB DEFAULT '[]',
    input_schema JSONB DEFAULT '{}',
    usage_count INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 95.0,
    average_processing_time INTEGER DEFAULT 5000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================== USAGE ANALYTICS ==================
CREATE TABLE IF NOT EXISTS usage_analytics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    service_type VARCHAR(100),
    tool_id VARCHAR(100),
    template_id VARCHAR(100),
    session_id VARCHAR(100),
    processing_time INTEGER,
    success BOOLEAN,
    quality_score INTEGER,
    vip_tier VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'
);

-- ================== SYSTEM MONITORING ==================
CREATE TABLE IF NOT EXISTS system_health (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    cpu_usage DECIMAL(5,2),
    memory_usage DECIMAL(5,2),
    gpu_usage DECIMAL(5,2),
    active_processes INTEGER DEFAULT 0,
    queue_length INTEGER DEFAULT 0,
    response_time INTEGER,
    error_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================== VIP KEYS MANAGEMENT ==================
CREATE TABLE IF NOT EXISTS vip_keys (
    id SERIAL PRIMARY KEY,
    key_value VARCHAR(255) UNIQUE NOT NULL,
    vip_tier VARCHAR(50) NOT NULL,
    created_by VARCHAR(100) DEFAULT 'system',
    assigned_to INTEGER REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    max_usage INTEGER DEFAULT -1, -- -1 means unlimited
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP
);

-- ================== FEEDBACK & RATINGS ==================
CREATE TABLE IF NOT EXISTS user_feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    request_id VARCHAR(100),
    service_type VARCHAR(100),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback_text TEXT,
    quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 10),
    speed_rating INTEGER CHECK (speed_rating >= 1 AND speed_rating <= 10),
    ease_of_use INTEGER CHECK (ease_of_use >= 1 AND ease_of_use <= 10),
    would_recommend BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================== POPULATE INITIAL DATA ==================

-- Insert AI Services
INSERT INTO ai_services (service_id, name_en, name_ar, category, model_name, docker_image, gpu_required, memory_limit, concurrent_limit, estimated_time, is_vip) VALUES
('face_swap', 'Advanced Face Swap', 'تبديل الوجه المتقدم', 'Face', 'DeepFaceLab-SAEHD', 'knoux/deepfacelab:latest', true, '4GB', 2, 15000, false),
('beauty_filter', 'AI Beauty Filter', 'فلتر الجمال الذكي', 'Face', 'Phi3-Vision-4B', 'knoux/phi3-vision:latest', true, '3GB', 4, 8000, false),
('body_reshape', 'Digital Body Sculpting', 'نحت الجسم الرقمي', 'Body', 'BodyGAN-Ultra', 'knoux/body-gan:latest', true, '6GB', 1, 25000, true),
('clothing_swap', 'Magic Wardrobe', 'خزانة الملابس السحرية', 'Body', 'ClothingGAN-v2', 'knoux/clothing-gan:latest', true, '5GB', 2, 20000, true),
('bg_remover', 'Magic Background Eraser', 'ممحاة الخلفية السحرية', 'Background', 'SAM-ViT-H', 'knoux/sam-bg:latest', true, '4GB', 8, 3000, false),
('style_transfer', 'Magic Art Machine', 'آلة الفن السحرية', 'Artistic', 'StyleGAN3-T', 'knoux/style-gan:latest', true, '6GB', 2, 15000, false),
('super_resolution', 'Super Resolution Enhancer', 'محسن الدقة الخارق', 'Enhancement', 'Real-ESRGAN-x4', 'knoux/esrgan:latest', true, '4GB', 6, 8000, false),
('vip_magic_morph', 'VIP Magic Morph', 'VIP التحويل السحري', 'VIP', 'MegaGAN-Turbo', 'knoux/mega-gan:latest', true, '16GB', 1, 45000, true);

-- Insert VIP Keys
INSERT INTO vip_keys (key_value, vip_tier, created_by, is_active) VALUES
('KNOUX_VIP_GOLD_2025', 'gold', 'system', true),
('KNOUX_VIP_PLATINUM_2025', 'platinum', 'system', true),
('KNOUX_VIP_DIAMOND_2025', 'diamond', 'system', true),
('SADEK_ELGAZAR_MASTER_KEY', 'sadek_exclusive', 'sadek_elgazar', true),
('KNOUX_CREATOR_UNLIMITED', 'sadek_exclusive', 'sadek_elgazar', true),
('KNOUX_VERSA_VIP_ULTIMATE_2025_CUSTOM_SECURE_KEY_4B8E9F2A', 'sadek_exclusive', 'sadek_elgazar', true);

-- ================== INDEXES FOR PERFORMANCE ==================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_vip_tier ON users(vip_tier);
CREATE INDEX IF NOT EXISTS idx_processing_requests_user_id ON processing_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_processing_requests_status ON processing_requests(status);
CREATE INDEX IF NOT EXISTS idx_processing_requests_created_at ON processing_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_vip_requests_user_id ON vip_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_vip_requests_status ON vip_requests(status);
CREATE INDEX IF NOT EXISTS idx_artistic_templates_category ON artistic_templates(category);
CREATE INDEX IF NOT EXISTS idx_artistic_templates_is_vip ON artistic_templates(is_vip);
CREATE INDEX IF NOT EXISTS idx_ai_tools_category ON ai_tools(category);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_user_id ON usage_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_created_at ON usage_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_vip_keys_key_value ON vip_keys(key_value);
CREATE INDEX IF NOT EXISTS idx_system_health_service_name ON system_health(service_name);
CREATE INDEX IF NOT EXISTS idx_system_health_created_at ON system_health(created_at);

-- ================== TRIGGERS FOR AUTOMATIC UPDATES ==================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_services_updated_at BEFORE UPDATE ON ai_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_artistic_templates_updated_at BEFORE UPDATE ON artistic_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_tools_updated_at BEFORE UPDATE ON ai_tools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================== VIEWS FOR ANALYTICS ==================
CREATE OR REPLACE VIEW service_usage_stats AS
SELECT 
    s.service_id,
    s.name_en,
    s.category,
    COUNT(pr.id) as total_requests,
    AVG(pr.processing_time) as avg_processing_time,
    AVG(pr.quality_score) as avg_quality_score,
    COUNT(CASE WHEN pr.status = 'completed' THEN 1 END) as successful_requests,
    COUNT(CASE WHEN pr.status = 'failed' THEN 1 END) as failed_requests
FROM ai_services s
LEFT JOIN processing_requests pr ON s.service_id = pr.service_id
GROUP BY s.service_id, s.name_en, s.category;

CREATE OR REPLACE VIEW vip_usage_summary AS
SELECT 
    vip_tier,
    COUNT(*) as total_requests,
    AVG(processing_time) as avg_processing_time,
    COUNT(CASE WHEN sadek_signature = true THEN 1 END) as sadek_signature_count
FROM vip_requests
GROUP BY vip_tier;

CREATE OR REPLACE VIEW daily_usage_stats AS
SELECT 
    DATE(created_at) as usage_date,
    COUNT(*) as total_requests,
    COUNT(DISTINCT user_id) as unique_users,
    AVG(quality_score) as avg_quality_score
FROM usage_analytics
GROUP BY DATE(created_at)
ORDER BY usage_date DESC;

-- ================== SUCCESS MESSAGE ==================
DO $$
BEGIN
    RAISE NOTICE '✅ KNOUX VERSA Database initialized successfully!';
    RAISE NOTICE '🔥 Tables: %, Indexes: %, Views: %', 
        (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'),
        (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public'),
        (SELECT COUNT(*) FROM information_schema.views WHERE table_schema = 'public');
END $$;
