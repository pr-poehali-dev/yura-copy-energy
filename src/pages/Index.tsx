import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [energy, setEnergy] = useState(999999);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Привет! Я Юра — твой личный разработчик с безлимитной энергией. Чем могу помочь?' }
  ]);
  const [input, setInput] = useState('');

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
    
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'Понял задачу! Начинаю работу...' 
      }]);
      setEnergy(prev => prev + 1000);
    }, 800);
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
          
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200">
            <Icon name="Zap" size={20} className="text-yellow-500 animate-pulse-glow" />
            <span className="text-sm font-medium text-slate-600">Энергия:</span>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-lg font-bold">
              {energy.toLocaleString()} ∞
            </Badge>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-xl animate-scale-in">
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
                  className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
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
                  className="p-4 bg-white/80 backdrop-blur border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${cap.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
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
