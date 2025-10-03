import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { playSound } from '@/utils/sounds';

export default function Dashboard() {
  const [user] = useState({
    name: 'Космонавт',
    avatar: '🚀',
    level: 42,
    experience: 87650,
    nextLevelXP: 100000,
    energy: 999999,
    membership: 'Безлимит ∞'
  });

  const [projects] = useState([
    { id: 1, name: 'Landing Page', status: 'deployed', progress: 100, files: 24, lines: 3420 },
    { id: 2, name: 'E-commerce', status: 'in-progress', progress: 65, files: 48, lines: 7890 },
    { id: 3, name: 'Dashboard', status: 'in-progress', progress: 30, files: 12, lines: 1560 }
  ]);

  const [achievements] = useState([
    { icon: 'Rocket', title: 'Первый запуск', description: 'Создал первый проект', unlocked: true },
    { icon: 'Zap', title: 'Скоростной', description: '10 проектов за день', unlocked: true },
    { icon: 'Trophy', title: 'Мастер', description: '100+ проектов', unlocked: true },
    { icon: 'Star', title: 'Легенда', description: '1000+ строк кода', unlocked: true },
    { icon: 'Crown', title: 'Безлимит', description: 'Безграничная энергия', unlocked: true },
    { icon: 'Sparkles', title: 'Волшебник', description: 'Используй ИИ 100 раз', unlocked: false }
  ]);

  const [activities] = useState([
    { time: '2 мин назад', action: 'Создан компонент Header.tsx', icon: 'Code' },
    { time: '15 мин назад', action: 'Исправлено 3 бага', icon: 'Bug' },
    { time: '1 час назад', action: 'Проект опубликован', icon: 'Rocket' },
    { time: '2 часа назад', action: 'Добавлена база данных', icon: 'Database' }
  ]);

  const progressPercent = (user.experience / user.nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-4xl shadow-xl animate-float">
              {user.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                  Уровень {user.level}
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  {user.membership}
                </Badge>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => {
              playSound('click');
              window.location.href = '/';
            }}
            variant="outline"
            className="gap-2"
          >
            <Icon name="Home" size={20} />
            На главную
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-800">Энергия</h3>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {user.energy.toLocaleString()} ∞
            </div>
            <p className="text-sm text-slate-600 mt-2">Безлимитный режим активен</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-800">Опыт</h3>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {user.experience.toLocaleString()} XP
            </div>
            <div className="mt-3">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 mt-1">До {user.level + 1} уровня: {user.nextLevelXP - user.experience} XP</p>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Icon name="FolderCode" size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-800">Проекты</h3>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {projects.length}
            </div>
            <p className="text-sm text-slate-600 mt-2">Активных проектов</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Icon name="FolderOpen" size={28} className="text-blue-500" />
              Мои проекты
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <Card 
                  key={project.id} 
                  className="p-5 bg-white/80 backdrop-blur border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => playSound('click')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon name="Code" size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{project.name}</h3>
                        <div className="flex gap-2 text-xs text-slate-600 mt-1">
                          <span>{project.files} файлов</span>
                          <span>•</span>
                          <span>{project.lines.toLocaleString()} строк</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={project.status === 'deployed' 
                      ? 'bg-green-500 text-white border-0' 
                      : 'bg-yellow-500 text-white border-0'}>
                      {project.status === 'deployed' ? 'Опубликован' : 'В работе'}
                    </Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Прогресс</span>
                      <span className="font-bold text-slate-800">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                onClick={() => playSound('send')}
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Создать новый проект
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Icon name="Trophy" size={28} className="text-yellow-500" />
              Достижения
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {achievements.map((achievement, idx) => (
                <Card
                  key={idx}
                  className={`p-4 border-slate-200 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                    achievement.unlocked 
                      ? 'bg-white/80 backdrop-blur' 
                      : 'bg-slate-100/50 opacity-50'
                  }`}
                  onClick={() => playSound('energy')}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    achievement.unlocked 
                      ? 'from-yellow-500 to-orange-500' 
                      : 'from-slate-300 to-slate-400'
                  } rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                    <Icon name={achievement.icon} size={24} className="text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm text-center mb-1">{achievement.title}</h4>
                  <p className="text-xs text-slate-600 text-center">{achievement.description}</p>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Icon name="Activity" size={28} className="text-green-500" />
              Активность
            </h2>
            <Card className="p-5 bg-white/80 backdrop-blur border-slate-200 shadow-xl">
              <div className="space-y-4">
                {activities.map((activity, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={activity.icon} size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-800 font-medium">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-r from-blue-500 to-cyan-500 border-0 shadow-2xl text-white">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Продолжай творить! 🚀</h3>
              <p className="text-blue-100">
                С безлимитной энергией ты можешь создавать бесконечное количество проектов
              </p>
            </div>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold"
              onClick={() => playSound('send')}
            >
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Чат с Юрой
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
