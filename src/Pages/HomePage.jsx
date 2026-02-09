import React, { useState, useEffect } from 'react';
import TodoItem from '../Components/TodoItem';
import { createTodoItem, DEFAULT_DATA } from '../Interfaces/TodoModel';
import { FaPlus, FaTasks, FaChartPie, FaRedo, FaTrashAlt, FaCode, FaHeart } from 'react-icons/fa';

const HomePage = () => {
  
  
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('myTodos');
    if (savedTodos) {
        return JSON.parse(savedTodos);
    } else {
        return DEFAULT_DATA;
    }
  });
  
  const [form, setForm] = useState({
    text: "",
    name: "",
    email: "",
    phone: "",
    priority: "Medium"
  });

  const [filter, setFilter] = useState("All");

  
  useEffect(() => {
    localStorage.setItem('myTodos', JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!form.text.trim() || !form.name.trim()) {
        alert("Lütfen en azından Görev Adı ve Kişi Adı alanlarını doldurun.");
        return;
    }

    const newTodo = createTodoItem(Date.now(), form.text, form.priority, form.name, form.email, form.phone);
    setTodos([newTodo, ...todos]);
    
    setForm({ text: "", name: "", email: "", phone: "", priority: "Medium" });
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const handleReset = () => {
    if(window.confirm("Tüm veriler silinip başlangıç verilerine dönülecek. Emin misin?")) {
        setTodos(DEFAULT_DATA);
    }
  };

  const handleClearAll = () => {
    if(window.confirm("Tüm liste kalıcı olarak silinecek?")) {
        setTodos([]);
    }
  };

  const completedCount = todos.filter(t => t.isCompleted).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.isCompleted;
    if (filter === 'Completed') return todo.isCompleted;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      
      {}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-6 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <FaTasks className="text-indigo-300"/> Takip Paneli
                </h1>
                <p className="text-indigo-200 text-xs md:text-sm mt-1">Müşteri ve görev yönetimi</p>
            </div>
            
            <div className="flex gap-2">
                <button onClick={handleReset} className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-sm transition flex items-center gap-2">
                    <FaRedo /> <span className="hidden md:inline">Sıfırla</span>
                </button>
                <button onClick={handleClearAll} className="bg-red-500/80 hover:bg-red-600 px-3 py-2 rounded-lg text-sm transition flex items-center gap-2">
                    <FaTrashAlt /> <span className="hidden md:inline">Hepsini Sil</span>
                </button>
            </div>
        </div>
      </header>

      {}
      <div className="container mx-auto px-4 mt-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {}
            <div className="lg:col-span-4 space-y-6">
                
                {}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-700">
                        <FaChartPie className="text-indigo-500"/> İlerleme Durumu
                    </h2>
                    <div className="flex justify-between text-sm mb-2 text-gray-500">
                        <span>Tamamlanan Görevler</span>
                        <span className="font-bold text-gray-800">{completedCount} / {totalCount}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                        <div 
                            className={`h-4 rounded-full transition-all duration-700 ease-out ${progress === 100 ? 'bg-green-500' : 'bg-indigo-500'}`} 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-center mt-2 text-sm font-semibold text-indigo-600">%{progress} Tamamlandı</p>
                </div>

                {}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-5 text-gray-700">Yeni Kayıt Oluştur</h2>
                    <form onSubmit={handleAddTodo} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-1">GÖREV / PROJE ADI</label>
                            <input 
                                name="text"
                                value={form.text}
                                onChange={handleChange}
                                type="text" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                placeholder="Örn: Web Sitesi Tasarımı"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">AD SOYAD</label>
                                <input 
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    type="text" 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="Ad Soyad"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">TELEFON</label>
                                <input 
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    type="text" 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="05XX..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-1">E-POSTA ADRESİ</label>
                            <input 
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                placeholder="mail@ornek.com"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-1">ÖNCELİK DURUMU</label>
                            <div className="flex gap-2">
                                {['Low', 'Medium', 'High'].map(p => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setForm({...form, priority: p})}
                                        className={`flex-1 py-2 text-sm rounded-lg border font-medium transition ${form.priority === p 
                                            ? (p === 'High' ? 'bg-red-500 text-white border-red-500' : p === 'Medium' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-blue-500 text-white border-blue-500') 
                                            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        {p === 'High' ? 'Acil' : p === 'Medium' ? 'Normal' : 'Düşük'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition shadow-lg shadow-indigo-200 mt-2"
                        >
                            <FaPlus /> Kaydet
                        </button>
                    </form>
                </div>
            </div>

            {}
            <div className="lg:col-span-8 space-y-6">
                
                <div className="bg-white p-2 rounded-xl shadow-sm inline-flex gap-1">
                    {['All', 'Active', 'Completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${filter === f ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {f === 'All' ? 'Tümü' : f === 'Active' ? 'Devam Edenler' : 'Tamamlananlar'}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredTodos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-center">
                            <div className="bg-gray-50 p-4 rounded-full mb-4">
                                <FaTasks className="text-4xl text-gray-300"/>
                            </div>
                            <h3 className="text-lg font-bold text-gray-700">Kayıt Bulunamadı</h3>
                            <p className="text-gray-400">Yeni bir görev ekleyerek başlayabilirsin.</p>
                        </div>
                    ) : (
                        filteredTodos.map(todo => (
                            <TodoItem 
                                key={todo.id} 
                                todo={todo} 
                                onDelete={handleDelete}
                                onToggle={handleToggle}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
      </div>

      {}
      <footer className="mt-12 bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 font-medium flex justify-center items-center gap-2">
                <FaCode className="text-indigo-500" /> 
                Geliştirici: <span className="text-indigo-700 font-bold">Emirhan Güçlü</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
                Bu proje <span className="font-semibold text-gray-500">React</span>, <span className="font-semibold text-gray-500">Tailwind CSS</span> ve <span className="font-semibold text-gray-500">LocalStorage</span> kullanılarak geliştirilmiştir.
            </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;