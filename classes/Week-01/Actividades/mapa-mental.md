Elabora un mapa conceptual o infografía para conectar los 4 temas principales de la Unidad 1: Calidad de Software, Procesos de Software, Modelos de Calidad y Deuda Técnica.

Asegúrate de relacionar los conceptos clave que se te proporcionaron en el listado. Tu trabajo debe reflejar una comprensión clara de sus interconexiones y dependencias.

## 🗺️ Mapa Conceptual Principal: Los 4 Pilares del Aseguramiento de Calidad

```mermaid
mindmap
  root((🎯 ASEGURAMIENTO<br/>DE CALIDAD<br/>DEL SOFTWARE))
    📊 CALIDAD DE SOFTWARE
      🎭 Perspectivas Múltiples
        📱 Usuario
        💼 Empresa
        💻 Técnico
        📜 Expertos
      💸 Economía
        ✅ Buena Calidad
        ❌ NO-Calidad
        📈 Ley Exponencial
      🐛 Origen Defectos
        📝 Requisitos
        🏗️ Diseño
        💻 Código
      🤝 Responsabilidad
        👨‍💼 Gerente
        👨‍💻 Dev
        🔍 QA
        📊 Gestión

    🔄 PROCESOS DE SOFTWARE
      🎯 Definición
        📋 SWEBOK
        🏢 John Croxy
        ❓ Qué Quién Cuándo Cómo
      🏗️ Tres Pilares
        🔄 PROCESO
        ⚙️ MÉTODOS
        🛠️ HERRAMIENTAS
      🏥 Caso Real
        📈 Innovate Health
        🔄 Ciclo Completo
        📊 Retroalimentación
      📐 Estándares
        📜 ISO 12207
        🗺️ BPMN
        📊 SPEM

    📈 MODELOS DE CALIDAD
      ⚖️ Madurez
        📉 Inmaduros
        📈 Maduros
      🏆 CMMI
        1️⃣ Inicial
        2️⃣ Gestionado
        3️⃣ Definido
        4️⃣ Cuantitativo
        5️⃣ Optimizado
      🌐 ISO 33000
        🎯 Marco Internacional
        📊 Evaluación
      🌎 Adaptaciones
        🇧🇷 MPS.BR
        🇲🇽 MoProSoft
        🌎 Competisoft

    💰 DEUDA TÉCNICA
      🏦 Concepto
        💳 Ward Cunningham
        ⚖️ Velocidad vs Calidad
        📈 Costo Futuro
      🎯 Tipos
        ✅ Intencional Prudente
        ❌ Intencional Imprudente
        🤔 No Intencional Prudente
        😵 No Intencional Imprudente
      📊 Impacto
        🐌 Desarrollo Lento
        💸 20-40% Presupuesto
        🔄 Efecto Acumulativo
      🛠️ Gestión
        🔄 Refactorización
        👥 Code Reviews
        🤖 Automatización
        📈 Ciclo PHVA
```

## 🔗 Diagrama de Interconexiones y Dependencias

```mermaid
graph TD
    A[🎯 CALIDAD DE SOFTWARE<br/>Objetivo Central] --> B[🔄 PROCESOS DE SOFTWARE<br/>Vehículo para lograr calidad]
    B --> C[📈 MODELOS DE CALIDAD<br/>Evalúan y mejoran procesos]
    C --> D[💰 DEUDA TÉCNICA<br/>Indicador de salud del sistema]
    D --> A

    subgraph "🏗️ Tres Pilares Transversales"
        E[🔄 PROCESO<br/>Qué y Cuándo]
        F[⚙️ MÉTODOS<br/>Cómo hacer]
        G[🛠️ HERRAMIENTAS<br/>Automatización]
    end

    B --> E
    B --> F
    B --> G

    subgraph "📊 Economía de la Calidad"
        H[💸 Costo NO-Calidad<br/>$2.8 trillones USD]
        I[📈 Ley Exponencial<br/>1x → 100x costo]
        J[⚖️ Prevención vs Corrección]
    end

    A --> H
    A --> I
    A --> J

    subgraph "🔄 Mejora Continua"
        K[📈 CMMI Nivel 5<br/>Optimización]
        L[🏥 Innovate Health<br/>Retroalimentación]
        M[🛠️ Gestión Deuda<br/>Ciclo PHVA]
    end

    C --> K
    B --> L
    D --> M

    K --> L
    L --> M
    M --> K

    style A fill:#ff6b6b,stroke:#c92a2a,color:#fff
    style B fill:#4ecdc4,stroke:#26d0ce,color:#fff
    style C fill:#45b7d1,stroke:#339af0,color:#fff
    style D fill:#f9ca24,stroke:#f0932b,color:#fff
```

## 📋 Resumen de Conceptos Clave e Interconexiones

### 🎯 **Calidad de Software como Objetivo Central**
- **Definiciones múltiples**: ISO 8402, IEEE, Capers Jones
- **Perspectivas stakeholders**: Usuario, Empresa, Técnico, Expertos
- **Economía**: Costo de buena calidad vs NO-calidad ($2.8 trillones USD en 2018)
- **Origen defectos**: 94% código, 5% diseño, 1% requisitos (pero más costosos)

### 🔄 **Procesos de Software como Vehículo**
- **Estructura organizacional**: Qué, Quién, Cuándo, Cómo
- **Tres pilares**: Proceso + Métodos + Herramientas
- **Caso real**: Innovate Health (ciclo completo con retroalimentación)
- **Estándares**: ISO/IEC/IEEE 12207, BPMN, SPEM

### 📈 **Modelos de Calidad como Hoja de Ruta**
- **Evolución**: Inmaduros (ad hoc) → Maduros (disciplinados)
- **CMMI**: 5 niveles desde Inicial hasta Optimizado
- **Marco internacional**: ISO/IEC 33000 (SPICE)
- **Adaptaciones regionales**: MPS.BR, MoProSoft, Competisoft

### 💰 **Deuda Técnica como Indicador**
- **Metáfora financiera**: Atajos hoy = Intereses mañana
- **Tipos**: Intencional/No intencional × Prudente/Imprudente
- **Impacto**: 20-40% presupuesto tecnológico, efecto acumulativo
- **Gestión**: Refactorización, code reviews, automatización, ciclo PHVA

### 🔗 **Interconexiones Fundamentales**

1. **Flujo principal**: Calidad → Procesos → Modelos → Deuda Técnica → Calidad
2. **Tres pilares transversales**: Presente en todos los elementos
3. **Mejora continua**: CMMI nivel 5, ciclo Innovate Health, gestión deuda técnica
4. **Economía integrada**: Ley exponencial, prevención vs corrección, ROI sistemático

> **Conclusión**: Los cuatro elementos forman un **ecosistema integrado** donde la calidad es el objetivo central, los procesos son el vehículo, los modelos proporcionan la hoja de ruta y la deuda técnica actúa como indicador de salud del sistema. La mejora continua y los tres pilares (proceso, métodos, herramientas) son transversales a todo el sistema.
