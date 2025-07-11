
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, Star, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAnalytics } from '@/services/analytics';
import { Analytics } from '@/types';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Cargando analíticas...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Error al cargar las analíticas</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analíticas de Profesores</h1>
          <p className="text-muted-foreground">
            Datos generalizados y estadísticas del sistema
          </p>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profesores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{analytics.totalProfessors}</div>
            <p className="text-xs text-muted-foreground">Activos en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cursos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{analytics.totalCourses}</div>
            <p className="text-xs text-muted-foreground">Cursos ofrecidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reseñas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{analytics.totalReviews}</div>
            <p className="text-xs text-muted-foreground">Evaluaciones recibidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {((analytics.avgPersonalRating + analytics.avgTeachingRating) / 2).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">De 5.0 estrellas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de barras por departamento */}
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas por Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.departmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="department" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgPersonalRating" fill="#ef4444" name="Valoración Personal" />
                <Bar dataKey="avgTeachingRating" fill="#f59e0b" name="Valoración Docente" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico circular de distribución */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Profesores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.departmentStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ department, professorCount }) => `${department}: ${professorCount}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="professorCount"
                >
                  {analytics.departmentStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Profesores mejor valorados */}
      <Card>
        <CardHeader>
          <CardTitle>Profesores Mejor Valorados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topRatedProfessors.map((professor, index) => (
              <div key={professor.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <img
                  src={professor.image}
                  alt={professor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold">{professor.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {professor.department}
                  </Badge>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Personal:</span>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={`text-xs ${i < Math.floor(professor.personalRating) ? 'heart-filled' : 'text-gray-300'}`}>
                          {i < Math.floor(professor.personalRating) ? '❤️' : '💔'}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium">{professor.personalRating.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Docente:</span>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(professor.teachingRating) ? 'star-filled fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{professor.teachingRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
