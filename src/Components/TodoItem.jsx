import React from 'react';
import { FaTrash, FaCheckCircle, FaRegCircle, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  
  const getPriorityColor = (p) => {
    if (p === 'High') return 'bg-red-100 text-red-800 border-red-200';
    if (p === 'Medium') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getPriorityBadge = (p) => {
     if (p === 'High') return 'Yüksek';
     if (p === 'Medium') return 'Orta';
     return 'Düşük';
  };

  return (
    <div className={`group flex flex-col sm:flex-row items-start sm:items-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 mb-4 gap-4 ${todo.isCompleted ? 'border-gray-300 bg-gray-50' : 'border-indigo-500'}`}>
      
      {}
      <button 
        onClick={() => onToggle(todo.id)} 
        className={`text-3xl transition-colors shrink-0 ${todo.isCompleted ? 'text-green-500' : 'text-gray-300 hover:text-indigo-500'}`}
      >
        {todo.isCompleted ? <FaCheckCircle /> : <FaRegCircle />}
      </button>

      {}
      <div className={`flex-1 w-full ${todo.isCompleted ? 'opacity-50' : ''}`}>
        
        {}
        <div className="flex justify-between items-start mb-2">
            <h3 className={`font-bold text-lg text-gray-800 ${todo.isCompleted ? 'line-through' : ''}`}>
                {todo.text}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getPriorityColor(todo.priority)}`}>
                {getPriorityBadge(todo.priority)}
            </span>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
                <FaUser className="text-indigo-400 text-xs"/> {todo.name}
            </div>
            <div className="flex items-center gap-2">
                <FaPhone className="text-green-400 text-xs"/> {todo.phone}
            </div>
            <div className="flex items-center gap-2 col-span-2">
                <FaEnvelope className="text-orange-400 text-xs"/> {todo.email}
            </div>
        </div>
        
        <div className="text-xs text-gray-400 mt-2 text-right">
            Eklenme: {todo.createdAt}
        </div>
      </div>

      {}
      <button 
        onClick={() => onDelete(todo.id)}
        className="w-full sm:w-auto bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 px-4 py-2 rounded-lg transition text-sm flex items-center justify-center gap-2"
      >
        <FaTrash /> <span className="sm:hidden">Sil</span>
      </button>
    </div>
  );
};

export default TodoItem;