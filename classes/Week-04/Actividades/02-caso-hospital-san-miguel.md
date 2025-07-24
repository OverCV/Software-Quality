# Caso de Estudio: Hospital San Miguel - Análisis de Defectos en Prescripción Electrónica

**Estudiante:** [Tu nombre]  
**Fecha:** [Fecha actual]  
**Curso:** Calidad de Software

---

## 🏥 Contexto del Caso

El Hospital San Miguel implementó un **módulo de prescripción electrónica** que presentó errores críticos en producción:
- **Dosis incorrectas** (riesgo vital para pacientes)
- **Duplicación de tratamientos** (efectos adversos)
- **Lentitud en validación** de interacciones (inoperancia clínica)

### Datos de Defectos por Fase

| Fase | Defectos Introducidos | Defectos Eliminados | Defectos que Pasan | Causa Principal |
|------|---------------------|-------------------|------------------|----------------|
| Requisitos | 50 | 20 | 30 | Requisitos ambiguos (RA) |
| Diseño | 80 | 50 | 30 | Errores modelo datos (MD) |
| Codificación | 100 | 60 | 40 | Duplicación lógica (DL) |
| **TOTAL** | **230** | **130** | **100** | - |

### Datos de Defectos por Módulo

| Módulo | Defectos | LOC | Densidad |
|--------|----------|-----|----------|
| Validación | 12 | 300 | 0.040 def/LOC |
| Interfaz Prescripción | 9 | 200 | 0.045 def/LOC |
| Base de Datos | 3 | 100 | 0.030 def/LOC |

---

## 1. 📊 Aplicación del Principio de Pareto

### Análisis de Causas Principales

Basándome en los defectos introducidos por fase y sus causas asociadas:

| Ranking | Causa | Defectos Asociados | % Individual | % Acumulado | Fase |
|---------|-------|-------------------|--------------|-------------|------|
| 1 | **DL** (Duplicación lógica) | 100 | 43.48% | 43.48% | Codificación |
| 2 | **MD** (Errores modelo datos) | 80 | 34.78% | 78.26% | Diseño |
| 3 | **RA** (Requisitos ambiguos) | 50 | 21.74% | 100.00% | Requisitos |

### 🎯 Interpretación y Priorización

#### **Causa Prioritaria #1: Duplicación de Lógica (DL)**
- **43.48%** de defectos introducidos
- **Impacto crítico:** Genera dosis duplicadas y tratamientos redundantes
- **Riesgo:** Sobredosis medicamentosa = amenaza vital directa

#### **Causa Prioritaria #2: Errores de Modelo de Datos (MD)**  
- **34.78%** de defectos introducidos
- **Impacto crítico:** Compromete integridad de historias clínicas
- **Riesgo:** Pérdida de información médica crítica

#### **Justificación de Priorización:**
**DL + MD = 78.26%** de los defectos. Siguiendo Pareto, **2 causas (67% de categorías) generan 78% de problemas**.

**En contexto hospitalario:** Ambas causas tienen **impacto directo en seguridad del paciente**, justificando máxima prioridad.

---

## 2. 🔍 Análisis de Densidad de Defectos por Módulo

### Cálculo de Densidades

| Módulo | Defectos | LOC | Densidad (def/LOC) | Ranking Riesgo |
|--------|----------|-----|-------------------|----------------|
| **Interfaz Prescripción** | 9 | 200 | **0.045** | 🔴 **CRÍTICO** |
| **Validación** | 12 | 300 | **0.040** | 🟠 **ALTO** |
| **Base de Datos** | 3 | 100 | **0.030** | 🟡 **MEDIO** |

### 🚨 Análisis de Criticidad

#### **Módulo de Mayor Riesgo: Interfaz de Prescripción**
- **Densidad más alta:** 0.045 defectos/LOC
- **Impacto crítico:** Interfaz directa con médicos → errores en entrada de datos
- **Consecuencia:** Prescripciones incorrectas llegan directamente al paciente

#### **Módulo Validación - Segundo en Prioridad:**
- **Densidad alta:** 0.040 defectos/LOC  
- **Función crítica:** Última barrera de seguridad antes de dispensar medicamento
- **Consecuencia:** Fallas aquí permiten que errores lleguen al paciente

#### **Recomendación:** 
**Atención URGENTE** requerida en Interfaz de Prescripción, seguida por módulo de Validación.

---

## 3. 📈 Efectividad de Revisiones por Fase

### Cálculo de Efectividad

| Fase | Defectos Introducidos | Defectos Eliminados | Efectividad | Evaluación |
|------|---------------------|-------------------|-------------|-----------|
| **Requisitos** | 50 | 20 | **40.0%** | 🔴 **DEFICIENTE** |
| **Diseño** | 80 | 50 | **62.5%** | 🟠 **REGULAR** |
| **Codificación** | 100 | 60 | **60.0%** | 🟠 **REGULAR** |

### 📊 Interpretación de Efectividad

#### **Fase Crítica: Requisitos (40% efectividad)**
- **Muy por debajo** del objetivo mínimo (>70%)
- **Impacto:** 30 defectos de requisitos pasan a diseño
- **Causa raíz:** Requisitos médicos mal especificados

#### **Fases Diseño y Codificación (60-62.5%)**
- **Marginalmente aceptable** pero mejorable
- **Oportunidad:** Aumentar a >75% mediante inspecciones formales

#### **Efectividad Global del Proceso:**
- Total eliminados: 130/230 = **56.5%**
- **Resultado:** 100 defectos llegaron a producción
- **Evaluación:** Proceso de revisión **INSUFICIENTE** para contexto crítico hospitalario

---

## 4. 🌊 Modelo de Amplificación de Defectos

### Flujo de Defectos No Corregidos

```
📋 FASE REQUISITOS:
├── Introducidos: 50 (RA)
├── Eliminados: 20 (40% efectividad)  
└── Pasan a Diseño: 30 → se amplifican 1.5x = 45

🎨 FASE DISEÑO:
├── Heredados: 45 (de requisitos)
├── Nuevos: 80 (MD)
├── Total presentes: 125
├── Eliminados: 50
└── Pasan a Codificación: 75 → se amplifican 1.3x = 98

💻 FASE CODIFICACIÓN:
├── Heredados: 98 (acumulados)
├── Nuevos: 100 (DL)
├── Total presentes: 198
├── Eliminados: 60
└── Llegan a Producción: 138
```

### 🔥 Análisis del Efecto Cascada

#### **Requisitos Ambiguos → Mayor Amplificación**
- **30 defectos** no corregidos se convierten en **45** en diseño
- **Factor amplificación:** 1.5x
- **Impacto:** Requisitos médicos mal definidos generan múltiples interpretaciones erróneas

#### **Errores de Modelo de Datos → Propagación Sistémica**  
- **Defectos estructurales** se propagan a toda la aplicación
- **Resultado:** Inconsistencias en almacenamiento de prescripciones

#### **Duplicación de Lógica → Explosión en Producción**
- **100 nuevos defectos** en codificación
- **Causa:** Múltiples implementaciones del mismo algoritmo de validación
- **Consecuencia:** Comportamientos inconsistentes entre módulos

### 💰 Análisis de Costos de Corrección

| Fase Detección | Costo Unitario | Defectos | Costo Total |
|----------------|---------------|----------|-------------|
| Requisitos | $200 | 30 no detectados | $6,000 |
| Diseño | $800 | 75 no detectados | $60,000 |
| Codificación | $2,500 | 138 no detectados | $345,000 |
| **Producción** | **$15,000** | **138 defectos** | **$2,070,000** |

**Costo de no detectar en requisitos:** $2,070,000 vs $6,000 = **345x más caro**

---

## 5. 🚀 Acciones Correctivas y Preventivas

### Acción #1: Programa de Revisiones Médico-Técnicas (Urgente)

#### **Objetivo:** Eliminar requisitos ambiguos (RA)
#### **Implementación:**
- **Semana 1-2:** Formar equipos mixtos médico-ingeniería  
- **Semana 3-4:** Re-validar 100% de requisitos de prescripción con médicos especialistas
- **Ongoing:** Sesiones semanales de clarificación con farmacología clínica

#### **Métricas de Éxito:**
- Efectividad de revisión de requisitos: **40% → 75%**
- Reducción de defectos RA: **70%**

#### **ROI Esperado:**
- Inversión: $25,000 (consultoría médica)
- Ahorro: $1,400,000 (evitar 70% de defectos en producción)
- **ROI: 5,500%**

### Acción #2: Refactorización del Modelo de Datos (Crítica)

#### **Objetivo:** Eliminar errores de modelo de datos (MD)
#### **Implementación:**
- **Semana 1:** Auditoría completa del esquema de BD con DBA senior
- **Semana 2-4:** Rediseño normalizado de tablas de medicamentos/prescripciones
- **Semana 5-6:** Migración de datos con validación médica

#### **Métricas de Éxito:**
- Integridad referencial: **100%**
- Reducción defectos MD: **80%**
- Performance consultas: **mejora 50%**

#### **Justificación:**
Modelo mal diseñado es **causa raíz sistémica** que amplifica errores en todas las capas.

### Acción #3: Implementación de Librería Central de Validación (Estratégica)

#### **Objetivo:** Eliminar duplicación de lógica (DL)
#### **Implementación:**
- **Semana 1-2:** Diseñar API centralizada de validación farmacológica
- **Semana 3-6:** Desarrollar librería con validación de interacciones/dosis
- **Semana 7-8:** Refactorizar módulos para usar librería única

#### **Métricas de Éxito:**
- **Una sola implementación** de cada regla de validación
- Reducción defectos DL: **90%**
- Tiempo de validación: **mejora 60%**

#### **Beneficios Adicionales:**
- **Mantenibilidad:** Cambios en una sola ubicación
- **Consistencia:** Comportamiento uniforme
- **Escalabilidad:** Fácil adición de nuevas validaciones

---

## 📋 Plan de Implementación Integrado

### Cronograma de Ejecución (12 semanas)

| Semana | Acción #1 (RA) | Acción #2 (MD) | Acción #3 (DL) |
|--------|---------------|---------------|---------------|
| 1-2 | Equipos médico-técnicos | Auditoría BD | Diseño API validación |
| 3-4 | Re-validación requisitos | Rediseño esquema | Desarrollo librería |
| 5-6 | Sesiones clarificación | Migración datos | Desarrollo librería |
| 7-8 | Monitoreo efectividad | Testing post-migración | Refactorización módulos |
| 9-12 | Proceso continuo | Optimización | Testing integración |

### Indicadores de Impacto

| KPI | Baseline | Objetivo 3 meses | Método Medición |
|-----|----------|------------------|-----------------|
| **Efectividad Global** | 56.5% | >80% | Defectos eliminados/introducidos |
| **Defectos en Producción** | 138 | <30 | Reportes post-deployment |
| **Tiempo Validación** | [actual] | -60% | Métricas performance |
| **Satisfacción Médicos** | [baseline] | >8.5/10 | Encuestas mensuales |

---

## 📊 Conclusiones y Recomendaciones Estratégicas

### Hallazgos Críticos

1. **Principio de Pareto confirmado:** 2 causas (DL+MD) = 78% de defectos
2. **Interfaz de prescripción:** Módulo más riesgoso (0.045 def/LOC) 
3. **Revisión de requisitos:** Crítica debilidad (40% efectividad)
4. **Amplificación dramática:** Costos 345x mayores por detección tardía

### Recomendaciones Ejecutivas

#### **Corto Plazo (0-3 meses):**
- **Suspender** funcionalidades críticas hasta implementar acciones #1 y #2
- **Implementar** monitoreo 24/7 de errores de medicación
- **Establecer** protocolo de escalamiento para errores de seguridad

#### **Mediano Plazo (3-6 meses):**
- **Certificar** sistema con autoridades sanitarias
- **Expandir** programa de revisiones médico-técnicas a otros módulos
- **Implementar** métricas de calidad en tiempo real

#### **Largo Plazo (6-12 meses):**
- **Establecer** centro de excelencia en software médico
- **Desarrollar** framework reutilizable para otros hospitales
- **Implementar** programa de mejora continua basado en datos

### Impacto Esperado

#### **Seguridad del Paciente:**
- Reducción **85%** en errores de medicación
- Eliminación de **duplicaciones de tratamiento**
- Mejora **60%** en tiempo de respuesta de validaciones

#### **Impacto Económico:**
- **ROI consolidado:** 2,100% en 12 meses
- **Ahorro anual:** $1.8M por evitar defectos
- **Reducción costos** operativos: 40%

---

**"En sistemas críticos como los hospitalarios, la calidad no es una opción, es un imperativo ético"**

*Este análisis demuestra que la aplicación sistemática de técnicas de ingeniería de calidad puede transformar radicalmente la confiabilidad de sistemas que impactan directamente la vida humana.* 