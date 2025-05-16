const React = require('react');
const { useState, useEffect } = React;
const { supabase } = require('../supabase');
const GameForm = require('./GameForm').default;

const AdminPanel = () => {
  const [games, setGames] = useState([]);
  const [maintenance, setMaintenance] = useState({ active: false, message: '', estimated_end: '' });

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from('games').select('*');
      if (error) console.error('Error fetching games:', error);
      else setGames(data || []);
    };
    const fetchMaintenance = async () => {
      const { data, error } = await supabase.from('maintenance').select('*').single();
      if (error) console.error('Error fetching maintenance:', error);
      else setMaintenance(data || { active: false, message: '', estimated_end: '' });
    };
    fetchGames();
    fetchMaintenance();
  }, []);

  const handleMaintenance = async () => {
    const { error } = await supabase.from('maintenance').upsert([{ id: 1, ...maintenance }]);
    if (error) console.error('Error updating maintenance:', error);
    else alert('Настройки техобслуживания сохранены');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Админ-панель</h2>
      <h3 className="text-xl mb-2">Добавить игру</h3>
      <GameForm onSubmit={async (game) => {
        const { error } = await supabase.from('games').insert([game]);
        if (error) console.error('Error adding game:', error);
        else setGames([...games, game]);
      }} />
      <h3 className="text-xl mb-2 mt-8">Редактировать игру</h3>
      <select
        className="w-full p-2 mb-4 rounded bg-gray-700"
        onChange={(e) => {/* Логика редактирования */}}
      >
        <option value="">Выберите игру</option>
        {games.map((game) => (
          <option key={game.id} value={game.id}>{game.title}</option>
        ))}
      </select>
      <h3 className="text-xl mb-2 mt-8">Технический перерыв</h3>
      <label className="block mb-2">
        Активен:
        <input
          type="checkbox"
          checked={maintenance.active}
          onChange={(e) => setMaintenance({ ...maintenance, active: e.target.checked })}
          className="ml-2"
        />
      </label>
      <input
        type="text"
        placeholder="Сообщение"
        className="w-full p-2 mb-2 rounded bg-gray-700"
        value={maintenance.message}
        onChange={(e) => setMaintenance({ ...maintenance, message: e.target.value })}
      />
      <input
        type="datetime-local"
        className="w-full p-2 mb-2 rounded bg-gray-700"
        value={maintenance.estimated_end}
        onChange={(e) => setMaintenance({ ...maintenance, estimated_end: e.target.value })}
      />
      <button onClick={handleMaintenance} className="w-full p-2 bg-blue-600 rounded">
        Сохранить
      </button>
    </div>
  );
};

module.exports = { default: AdminPanel };