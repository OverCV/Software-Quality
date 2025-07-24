# Módulo 1: Métricas del Producto de Software (ISO 25010 / ISO 25012)

## Introducción

La calidad del software es un pilar estratégico en el desarrollo de productos confiables, mantenibles y alineados con las expectativas de usuarios y stakeholders. Como afirma Tracy O'Rourke: **"Sin la información correcta, solo eres otra persona con una opinión"**. Esta frase resalta la importancia de las métricas como instrumentos que permiten pasar de percepciones subjetivas a juicios objetivos. 

En entornos donde los recursos son limitados, las métricas facilitan:
- La priorización
- El diagnóstico temprano
- La toma de decisiones informadas

## Desafíos de Medir Calidad en Software

Medir calidad en software presenta desafíos únicos. A diferencia de productos físicos, muchas métricas del software son indirectas y carecen de estándares universales de aceptación. Aún así, si son **objetivas, repetibles, veraces y estandarizadas**, permiten evaluar sistemáticamente atributos clave del producto. 

En este contexto, los estándares **ISO/IEC 25010** e **ISO/IEC 25012** —parte de la familia SQuaRE (System and Software Quality Requirements and Evaluation)— ofrecen un marco robusto para diseñar y aplicar métricas de calidad tanto del software como de los datos que maneja.

## El Modelo de Calidad del Producto: ISO/IEC 25010

La norma ISO/IEC 25010 define **ocho características principales** para evaluar la calidad del software:

### 1. Adecuación Funcional
Evalúa si el software cumple con funciones esperadas bajo condiciones específicas.

### 2. Eficiencia de Desempeño
Mide el rendimiento respecto al uso de recursos como tiempo de CPU o memoria.

### 3. Compatibilidad
Determina la capacidad del sistema para operar junto a otros sistemas y compartir entornos.

### 4. Usabilidad
Evalúa la facilidad de aprendizaje, operación y satisfacción del usuario final.

### 5. Fiabilidad
Mide la capacidad del software para funcionar correctamente durante un periodo determinado.

### 6. Seguridad
Analiza mecanismos de protección, confidencialidad e integridad de la información.

### 7. Mantenibilidad
Determina cuán fácil es modificar el software para corregir, adaptar o mejorar funcionalidades.

### 8. Portabilidad
Evalúa la capacidad del software para transferirse entre distintos entornos.

### Subcaracterísticas de Mantenibilidad

Cada característica se subdivide en subcaracterísticas que permiten un análisis más específico. Por ejemplo, **mantenibilidad** incluye:
- Modularidad
- Reusabilidad
- Analizabilidad
- Modificabilidad
- Capacidad para ser probado

Estas subcaracterísticas son esenciales para definir métricas concretas y prácticas. En el caso de la capacidad para ser probado, métricas como la **complejidad ciclomática** o el **porcentaje de cobertura de pruebas** se vuelven relevantes.

## ISO/IEC 25012: Calidad de los Datos

Mientras ISO/IEC 25010 se enfoca en el software como producto, **ISO/IEC 25012** aborda la calidad de los datos, reconociendo su papel crítico en los sistemas modernos. Esta norma distingue dos perspectivas:

### Perspectiva Inherente
Evalúa características intrínsecas de los datos como:
- **Exactitud**: Representación fiel de la realidad
- **Completitud**: Presencia de todos los datos requeridos
- **Consistencia**: Ausencia de contradicciones
- **Credibilidad**: Confianza en la fuente
- **Actualidad**: Vigencia temporal de la información

### Perspectiva del Sistema
Examina atributos dependientes del entorno tecnológico como:
- **Disponibilidad**: Acceso oportuno a los datos
- **Portabilidad**: Transferencia entre sistemas
- **Recuperabilidad**: Restauración tras fallos

Ambos enfoques permiten evaluar no solo la estructura y procesamiento del software, sino también el valor y riesgo asociado a los datos que opera.

## Proceso de Medición de la Calidad del Producto

La medición de calidad es un proceso sistemático que consta de **seis etapas clave**:

### 1. Definir Atributos de Calidad

El primer paso es seleccionar qué aspectos del software se deben medir. Esto requiere priorización, dado que no es posible medir todo por restricciones de tiempo, presupuesto y capacidad analítica. 

La elección debe considerar el tipo de software y su contexto:
- **Sistema bancario**: Seguridad y fiabilidad son críticas
- **Aplicación de entretenimiento**: Pueden primar la usabilidad y la eficiencia de desempeño

### 2. Definir Métricas

Una métrica es una **medida cuantitativa del grado** en que un sistema posee un atributo determinado. Las métricas pueden derivarse de estándares como ISO/IEC 25010 o ser definidas por el equipo de desarrollo. 

**Deben especificarse con claridad:**
- Nombre
- Descripción
- Unidad de medida
- Fórmula de cálculo
- Fuente de datos

#### Ejemplos de Métricas:

**Para desempeño:**
- Tiempo de respuesta
- Uso de memoria

**Para fiabilidad:**
- Frecuencia de fallos
- MTBF (Tiempo Medio entre Fallos)

**Para usabilidad:**
- Tiempo para completar una tarea
- Número promedio de opciones por pantalla

**Para facilidad de pruebas:**
- Complejidad ciclomática (V(G))
- Porcentaje de comentarios (%COM)
- Nivel de anidamiento (NEST)
- Porcentaje de variables con nombres descriptivos (PVND)

### 3. Definir Límites de Aceptación

Para que una métrica sea útil, es necesario establecer **valores aceptables** o rangos de tolerancia. Estos límites dependen del tipo de proyecto, las prácticas de la organización y los objetivos de calidad. 

Comprender el sentido de la métrica es clave: un valor alto puede ser positivo (ej. disponibilidad), negativo (ej. complejidad) o neutro, dependiendo del contexto.

#### Ejemplos comunes de límites:
- **V(G)**: 1-8
- **NEST**: 1-4
- **%COM**: 10%-40%
- **PVND**: 85%-100%

### 4. Obtener Valores

La recolección de datos puede hacerse manualmente o mediante herramientas automatizadas. 

**Herramientas recomendadas:**
- SonarQube
- Codacy
- Snyk
- DeepSource
- Plugins para IDEs (IntelliJ, VS Code, Eclipse)

Estas herramientas permiten analizar código fuente y calcular métricas de manera **precisa, eficiente y reproducible**.

### 5. Analizar

El análisis implica interpretar los valores obtenidos y compararlos con los límites establecidos. Si una métrica está fuera del umbral, se debe valorar su impacto en la calidad. 

Este paso debe conectar los datos con la experiencia de desarrollo:
- Identificar patrones
- Localizar módulos problemáticos
- Evidenciar puntos fuertes y débiles

**Ejemplo:** Si el %COM de una clase es 0%, es probable que su comprensión y prueba sean difíciles, lo cual aumenta la deuda técnica.

### 6. Tomar Acciones

El propósito de medir es **mejorar**. Las acciones derivadas del análisis pueden ser:

**Correctivas:**
- Resolver problemas detectados
- Ej: agregar comentarios, reducir la complejidad

**Preventivas:**
- Evitar recurrencia de errores
- Ej: actualizar estándares de codificación, realizar capacitación técnica

## Conclusión

Medir la calidad del software no solo permite detectar fallas o cumplir con auditorías, sino que se convierte en un **instrumento para gestionar el desarrollo profesionalmente**, anticipar riesgos y asegurar valor para el usuario. 

Los estándares **ISO/IEC 25010** y **25012** ofrecen un lenguaje común y un marco práctico para transformar calidad en algo tangible, comparable y mejorable.

# Módulo 2: Análisis Estadístico de Defectos en Software

## Introducción

En todo proyecto de desarrollo de software, los defectos son inevitables. Sin embargo, su impacto sobre el producto final puede ser drásticamente reducido si se aplican estrategias de **análisis estadístico y priorización adecuadas**. 

La calidad del software no depende solo de la detección de errores, sino de la capacidad para:
- Identificar las causas raíz más frecuentes
- Intervenir tempranamente 
- Enfocar recursos donde generen mayor valor

Este capítulo aborda un conjunto de técnicas prácticas, respaldadas por la norma ISO/IEC y desarrolladas en el documento **10-AnalisisEstadistico.pdf**, que permiten mejorar la calidad del software mediante decisiones informadas y sistemáticas.

### Herramientas Clave

Entre las herramientas principales se incluyen:
- **Principio de Pareto**
- **Métricas de densidad de defectos**
- **Efectividad de las revisiones**
- **Modelo de amplificación de defectos**

Su correcta aplicación permite optimizar recursos, reducir retrabajos costosos y aumentar la confiabilidad del producto.

## Principio de Pareto: Priorizar lo Crítico

El **Principio de Pareto**, o regla del 80/20, sostiene que aproximadamente el **80% de los problemas** provienen del **20% de las causas**. En el ámbito del software, esto significa que un pequeño número de factores suele generar la mayoría de los defectos.

Aplicar este principio permite a los equipos concentrar sus esfuerzos en los puntos de mayor impacto.

### Aplicación Práctica

Según el proceso descrito en **10-AnalisisEstadistico.pdf**, se deben seguir tres pasos:

#### 1. Recopilar Información
Se clasifican los defectos por causas, como:
- **IES**: Especificaciones incompletas
- **MCC**: Mala comunicación con el cliente
- **EDR**: Errores en diseño de base de datos

#### 2. Analizar los Datos
Se utiliza una **tabla de Pareto** para visualizar la concentración de errores. Por ejemplo, en un análisis de 942 defectos, se observa que IES, MCC y EDR explican más del 35% del total.

#### 3. Actuar
Se toman medidas dirigidas a las causas prioritarias, como:
- Reforzar el levantamiento de requisitos
- Capacitar al equipo técnico

### Caso Práctico

Un equipo que desarrolla un **sistema de inventario** detecta que la mayoría de errores provienen de:
- Requisitos incompletos
- Fallos de integración

Al implementar **revisiones de requisitos** y **pruebas de integración anticipadas**, logran reducir los errores en un **40%** en las siguientes iteraciones.

## Densidad de Defectos: Medir para Comparar

La **densidad de defectos** mide cuántos errores contiene una unidad de tamaño del software, como líneas de código, pantallas o funciones. Esta métrica permite:
- Comparar calidad entre módulos
- Establecer prioridades de revisión o refactorización

### Fórmula

```
Densidad de defectos = Número de defectos / Tamaño del módulo
```

**Ejemplo:** Un módulo de 500 líneas de código (LOC) con 15 defectos tiene una densidad de **0.03 defectos/LOC**.

### Interpretación

- **Mayor densidad** → Mayor prioridad de revisión
- **Comparación entre módulos** → Identificación de componentes problemáticos
- **Tendencias** → Monitoreo de mejora continua

## Efectividad de las Revisiones

La efectividad mide qué tan bien una actividad de revisión elimina los defectos existentes.

### Fórmula

```
Efectividad = (Defectos eliminados / Defectos existentes) × 100%
```

**Ejemplo:** Si una revisión elimina 21 de 30 defectos existentes:
```
Efectividad = (21/30) × 100% = 70%
```

### Efectividad Combinada

De forma similar, si la **revisión de código** eliminó 29 de 31 defectos, su efectividad fue del **93.55%**. La efectividad combinada entre ambas actividades puede superar el **75%**, lo cual es deseable.

### Caso Práctico

En un **sistema de historia clínica electrónica**:
- **Revisiones de diseño**: 65% de efectividad
- **Pruebas unitarias**: 50% de efectividad

Basados en estos datos, el equipo fortaleció la revisión de diseño, logrando:
- Reducir errores críticos
- Evitar reprocesos posteriores

## Modelo de Amplificación de Defectos: Costos Crecientes

Este modelo describe cómo los defectos no eliminados en fases tempranas tienden a **amplificarse** en las siguientes, aumentando el esfuerzo y el costo de corrección.

### Ejemplo de Flujo

1. **En requisitos**: Se introducen 90 defectos y se eliminan 59 (efectividad 65%). Quedan 31 que se amplifican.

2. **En diseño**: Estos 31 se convierten en 47. Se agregan 120 nuevos defectos, de los cuales se eliminan 109.

3. **En codificación**: Los errores acumulados se convierten en 87 más 150 nuevos, lo cual incrementa los costos.

### Caso Práctico

Un proyecto de **e-commerce** que no corrige los defectos en los requisitos ve cómo estos se propagan y amplifican, duplicando el esfuerzo requerido en la codificación. 

Al implementar **revisiones más rigurosas** desde la etapa de análisis, logran:
- Reducir los defectos en un **30%**
- Disminuir significativamente los tiempos de desarrollo
- Reducir los costos de mantenimiento

## Implementación Práctica en Proyectos Reales

Para aplicar estas técnicas, se sugiere seguir un **enfoque estructurado**:

### 1. Registrar Datos
Clasificar los defectos durante el desarrollo, usando herramientas como:
- Hojas de cálculo
- JIRA
- Sistemas de gestión de defectos

### 2. Aplicar Análisis Estadístico
- Utilizar gráficos de Pareto
- Calcular métricas como densidad de defectos
- Medir efectividad de revisiones

### 3. Priorizar y Actuar
- Identificar las causas más frecuentes
- Aplicar acciones correctivas/preventivas según el análisis

### 4. Monitorear el Impacto
Volver a medir las métricas tras las acciones implementadas para verificar mejoras.

## Consideraciones y Desafíos

Aunque estas herramientas son poderosas, requieren:

### Requisitos Organizacionales
- **Cultura de registro disciplinado**
- **Entendimiento claro** de lo que cada métrica representa
- **Compromiso del equipo** con el proceso de mejora

### Precauciones
- No optimizar exclusivamente las métricas sin considerar:
  - Experiencia de usuario
  - Valor de negocio
- El análisis cuantitativo debe **complementarse con juicio experto**

## Conclusión

La combinación del **Principio de Pareto**, **métricas de densidad**, **efectividad de las revisiones** y el **modelo de amplificación** proporciona una guía poderosa para:

- Identificar y eliminar causas raíz
- Reducir el retrabajo
- Mejorar la calidad general del producto

Estas técnicas permiten transformar la gestión de calidad de un proceso reactivo a uno **proactivo y basado en datos**.

# Módulo 3: Revisiones e Inspecciones en el Desarrollo de Software

## Introducción

En el desarrollo de software, **detectar y corregir defectos de forma temprana** es vital para asegurar la calidad y reducir costos. Tradicionalmente, las pruebas han sido el principal método para encontrar errores, pero las **revisiones e inspecciones** han demostrado ser herramientas más eficaces en muchas situaciones.

### Ventajas de las Revisiones sobre las Pruebas

Según datos del material de estudio:
- **Pruebas unitarias**: Detectan entre 2 y 4 defectos por hora
- **Revisiones de código**: Pueden identificar entre **6 y 10 defectos por hora**
- **Revisiones**: Permiten descubrir hasta el **70%** de los errores
- **Pruebas en fases posteriores**: Logran detectar el **50%** de los errores

### Beneficios de las Revisiones

Las revisiones funcionan como **filtros tempranos** a lo largo del ciclo de vida del software, desde los requisitos hasta el código fuente. Dado que corregir un defecto se vuelve **más costoso cuanto más tarde se detecte**, estas prácticas son esenciales.

**Características principales:**
- No requieren herramientas sofisticadas
- Pueden realizarse entre pares o expertos ajenos al autor del producto
- Su eficacia depende de:
  - Buena planificación
  - Objetivos claros
  - Ambiente de colaboración y respeto

## Tipos de Revisiones: Del Enfoque Informal a la Inspección Formal

Las revisiones pueden clasificarse según su **nivel de formalidad**. Cada tipo tiene un propósito distinto y se adapta a necesidades específicas del proyecto.

### 1. Revisión Informal (por pares)

Es la forma más **básica y menos estructurada**. El autor o un compañero revisa el producto (como un fragmento de código o un esquema de diseño) en busca de errores.

**Características:**
- Aunque puede apoyarse en listas de chequeo, no es obligatorio
- Flexible y rápida
- Ideal para revisiones cotidianas

### 2. Revisión Guiada (Walkthrough)

Aquí, el **autor explica el producto** a un grupo de participantes, guiándolos con escenarios, diagramas o pruebas de escritorio. El objetivo es entender el producto y detectar problemas. Puede incluir un relator que documente los hallazgos.

**Características:**
- No hay límite de tiempo ni necesidad de roles estrictos
- Favorece la **comprensión colectiva**
- El autor lidera la sesión

**Aplicación práctica:**
Ideal para validar:
- Prototipos
- Mockups
- Procesos de negocio
- **Especialmente útil cuando los usuarios finales también participan**

### 3. Revisión Técnica (por expertos)

Este tipo es **más estructurado**. Se requiere un moderador (distinto del autor) y un grupo de expertos que revisan el producto de forma técnica. Hay preparación previa y se genera un reporte de hallazgos.

**Características:**
- Más formal que la revisión guiada
- Foco en **aspectos técnicos** y cumplimiento de estándares
- Requiere expertos en la materia

**Aplicación práctica:**
Revisión de:
- Arquitecturas de software
- Decisiones de diseño
- Código crítico
- **Ejemplo:** Validación de algoritmos de seguridad o patrones de diseño

### 4. Inspección Formal

Es la forma **más estructurada y rigurosa**. Un lector (no el autor) presenta el producto a un grupo de inspectores previamente preparados. El proceso incluye roles definidos, tiempos establecidos, documentación y seguimiento de acciones.

**Características:**
- Aunque consume más tiempo y recursos, es la **técnica más efectiva** para detectar errores
- Proceso altamente estructurado
- Roles claramente definidos

**Aplicación práctica:**
- Evaluación de componentes complejos
- Antes de liberaciones importantes
- Auditorías internas
- Certificaciones de calidad

## Listas de Chequeo: Herramientas Clave para la Revisión Sistemática

Una **lista de chequeo** es un conjunto de preguntas cerradas que se aplican durante una revisión. Cada **"Sí"** indica cumplimiento, mientras que un **"No"** puede señalar un posible defecto.

### Beneficios

- **Estandarización**: Evitan que se pasen por alto errores comunes
- **Flexibilidad**: Pueden aplicarse a diferentes artefactos (código, requisitos, diseño, pruebas, etc.)
- **Personalización**: Se adaptan fácilmente a las necesidades del equipo o proyecto
- **Complementariedad**: Sirven como base para otras técnicas como auditorías, revisiones técnicas o inspecciones

### Prácticas Efectivas

- **Personalizar** las listas según los defectos más frecuentes
- **Enfocar** la revisión en un solo tipo de categoría a la vez
- Si el autor revisa su propio trabajo, debe hacerlo en **otro momento** y en un **medio distinto** (por ejemplo, imprimir el código)
- **Verificar explícitamente** cada punto, sin suposiciones

### Actividad Recomendada

Diseñar una lista de chequeo específica para un artefacto como un **modelo de base de datos** o un **diagrama UML**. Esta debe incluir al menos:
- **Tres categorías** (estructura, nomenclatura, documentación)
- **Tres preguntas por cada una**

## La Inspección Formal: Estructura, Roles y Proceso

La inspección formal representa la **cúspide de la revisión estructurada**. Se basa en roles definidos y un proceso detallado.

### Roles Principales

#### Moderador
- **Dirige la reunión** y asegura que se sigan los procedimientos
- Responsable de la organización y control del proceso

#### Relator
- **Registra los defectos** encontrados y elabora el informe
- Documenta todas las observaciones importantes

#### Revisor (Inspector)
- Con **conocimiento técnico**, detecta defectos en la revisión
- Puede haber múltiples revisores según la complejidad

#### Lector (Opcional)
- **Presenta el producto**. Debe ser **distinto al autor**
- Guía la revisión línea por línea

#### Autor (Opcional)
- Participa **pasivamente**, aclara dudas pero **no defiende su trabajo**
- Su rol es principalmente de soporte informativo

#### Controlador de Tiempo (Opcional)
- Asegura que la reunión no se extienda demasiado
- Mantiene el ritmo apropiado de la revisión

### Etapas del Proceso

#### 1. Planeación y Lanzamiento
- El autor **prepara el producto**
- Se **asignan roles** y se distribuyen documentos
- Se proporcionan **listas de chequeo**

#### 2. Preparación Individual
- Cada revisor **estudia el producto por separado**
- **Anota errores potenciales** antes de la reunión
- Tiempo estimado: 1-2 horas de preparación por hora de reunión

#### 3. Reunión de Inspección
- Se busca **detectar el mayor número** de defectos posibles
- **No se discuten soluciones** ni se evalúa al autor
- Foco exclusivo en la identificación de problemas

#### 4. Corrección
- El autor realiza los **cambios requeridos**
- **Registra qué se ha corregido** para seguimiento

#### 5. Seguimiento
- El moderador **verifica** que las correcciones se hayan aplicado
- **Decide si es necesario** repetir la inspección

## Beneficios y Consideraciones

### Beneficios de las Inspecciones Formales

- **Mayor efectividad** en la detección de defectos
- **Proceso reproducible** y medible
- **Transferencia de conocimiento** entre miembros del equipo
- **Documentación completa** del proceso y resultados

### Consideraciones

- **Mayor inversión de tiempo** inicialmente
- Requiere **entrenamiento del equipo**
- Necesita **compromiso organizacional**
- Debe equilibrarse con **otros métodos** de aseguramiento de calidad

## Conclusión

Las revisiones e inspecciones representan una **estrategia fundamental** para mejorar la calidad del software. Desde las revisiones informales hasta las inspecciones formales, cada técnica tiene su lugar en el proceso de desarrollo.

La **selección del tipo de revisión** debe basarse en:
- **Criticidad del componente**
- **Recursos disponibles**
- **Experiencia del equipo**
- **Requisitos de calidad del proyecto**

Implementar un **programa estructurado de revisiones** puede resultar en mejoras significativas en la calidad del producto final, reducción de costos de mantenimiento y mayor satisfacción del equipo de desarrollo. 

