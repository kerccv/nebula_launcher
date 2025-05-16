const React = require('react');
const { useState, useEffect } = React;
const { supabase } = require('../supabase');

const Library = ({ user }) => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from('games').select('*').eq('visible', true);
      if (error) console.error('Error fetching games:', error);
      else setGames(data || []);
    };
    fetchGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск игр..."
        className="w-full p-2 mb-4 rounded bg-gray-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4">
        {filteredGames.map((game) => (
          <div key={game.id} className="card">
            {game.banner_url ? (
              <img src={game.banner_url} alt={game.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-2xl font-bold">{game.title}</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold">{game.title}</h3>
              <p>ОС: {game.requirements.os}</p>
              <p>Процессор: {game.requirements.cpu}</p>
              <p>ОЗУ: {game.requirements.ram} GB</p>
              <p>Место: {game.requirements.storage} GB</p>
              <p>Видеокарта: {game.requirements.gpu}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

module.exports = { default: Library };