const React = require('react');

const Maintenance = ({ maintenance }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center fade-in">
      <div className="card p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Технический перерыв</h1>
        <p>{maintenance.message || 'Лаунчер временно недоступен.'}</p>
        <p className="mt-2">
          Ожидаемое время окончания: {new Date(maintenance.estimated_end).toLocaleString('ru-RU')}
        </p>
      </div>
    </div>
  );
};

module.exports = { default: Maintenance };