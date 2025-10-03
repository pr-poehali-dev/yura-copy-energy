import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { playSound } from '@/utils/sounds';

export default function Index() {
  const [energy, setEnergy] = useState(999999);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Привет! Я Юра — твой личный разработчик с безлимитной энергией. Чем могу помочь?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [stats, setStats] = useState({ tasksCompleted: 0, linesOfCode: 0, bugsFixed: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => prev + Math.floor(Math.random() * 100));
      setStats(prev => ({
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 2),
        linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 50),
        bugsFixed: prev.bugsFixed + Math.floor(Math.random() * 3)
      }));
      playSound('energy');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const createParticle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setParticles(prev => [...prev, { id, x, y }]);
    playSound('click');
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  const capabilities = [
    {
      icon: 'Code',
      title: 'Генерация кода',
      description: 'Создаю React-компоненты, функции и целые страницы',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'Bug',
      title: 'Отладка и исправление',
      description: 'Нахожу и исправляю ошибки в коде автоматически',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'Rocket',
      title: 'Деплой проектов',
      description: 'Публикую сайты в интернет за секунды',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: 'Database',
      title: 'Работа с базами данных',
      description: 'Создаю схемы, миграции и API для данных',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'Zap',
      title: 'Backend функции',
      description: 'Пишу серверную логику на TypeScript и Python',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: 'Palette',
      title: 'UI/UX дизайн',
      description: 'Создаю красивые интерфейсы по вашему описанию',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    playSound('send');
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        'Понял задачу! Начинаю работу...',
        'Отлично! Сейчас сделаю за пару секунд 💫',
        'Уже работаю над этим! Энергия на максимуме ⚡',
        'Готово! Ещё что-нибудь? 🚀',
        'Обрабатываю запрос... Производительность 999%!'
      ];
      playSound('receive');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: responses[Math.floor(Math.random() * responses.length)]
      }]);
      setEnergy(prev => prev + Math.floor(Math.random() * 2000) + 500);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4 animate-float">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Icon name="Sparkles" size={48} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            Юра AI — Безлимитная версия
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Личный разработчик с неограниченной энергией 🚀
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200">
              <Icon name="Zap" size={20} className="text-yellow-500 animate-pulse-glow" />
              <span className="text-sm font-medium text-slate-600">Энергия:</span>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-lg font-bold">
                {energy.toLocaleString()} ∞
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div className="bg-white/50 backdrop-blur px-6 py-3 rounded-xl border border-slate-200">
              <div className="text-2xl font-bold text-blue-600">{stats.tasksCompleted}</div>
              <div className="text-xs text-slate-600">Задач выполнено</div>
            </div>
            <div className="bg-white/50 backdrop-blur px-6 py-3 rounded-xl border border-slate-200">
              <div className="text-2xl font-bold text-cyan-600">{stats.linesOfCode.toLocaleString()}</div>
              <div className="text-xs text-slate-600">Строк кода</div>
            </div>
            <div className="bg-white/50 backdrop-blur px-6 py-3 rounded-xl border border-slate-200">
              <div className="text-2xl font-bold text-green-600">{stats.bugsFixed}</div>
              <div className="text-xs text-slate-600">Багов исправлено</div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-xl animate-scale-in relative overflow-hidden" onClick={createParticle}>
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute pointer-events-none"
                style={{
                  left: p.x,
                  top: p.y,
                  animation: 'scale-in 1s ease-out forwards'
                }}
              >
                <Icon name="Sparkles" size={20} className="text-blue-500" />
              </div>
            ))}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Icon name="MessageSquare" size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Чат с Юрой</h2>
            </div>

            <div className="h-[400px] bg-slate-50 rounded-xl p-4 mb-4 overflow-y-auto border border-slate-200">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-4 flex justify-start animate-fade-in">
                  <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Напиши задачу для Юры..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="border-slate-300 focus:ring-blue-500"
              />
              <Button 
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Icon name="Cpu" size={28} className="text-blue-500" />
              Возможности
            </h2>
            
            <div className="grid gap-4">
              {capabilities.map((cap, idx) => (
                <Card
                  key={idx}
                  className="p-4 bg-white/80 backdrop-blur border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer animate-fade-in group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                  onClick={() => {
                    playSound('click');
                    setMessages(prev => [...prev, { role: 'assistant', text: `✨ ${cap.title}: Готов помочь! Просто опиши задачу.` }]);
                    setEnergy(prev => prev + 100);
                  }}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${cap.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon name={cap.icon} size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1">{cap.title}</h3>
                      <p className="text-sm text-slate-600">{cap.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-r from-blue-500 to-cyan-500 border-0 shadow-2xl text-white animate-scale-in">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Готов к работе 24/7</h3>
              <p className="text-blue-100">
                Безлимитная энергия означает, что я всегда на связи и готов помочь с любой задачей
              </p>
            </div>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold"
            >
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать проект
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}