const React = require('react');
const { useState } = React;

const GameForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    icon_url: '',
    banner_url: '',
    torrent_url: '',
    fix_url: '',
    visible: true,
    requirements: { os: '', cpu: '', ram: '', storage: '', gpu: '' },
    id: Date.now().toString(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!form.id) {
      setForm({
        title: '',
        icon_url: '',
        banner_url: '',
        torrent_url: '',
        fix_url: '',
        visible: true,
        requirements: { os: '', cpu: '', ram: '', storage: '', gpu: '' },
        id: Date.now().toString(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Название игры"
        className="w-full p-2 rounded bg-gray-700"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="url"
        placeholder="URL иконки"
        className="w-full p-2 rounded bg-gray-700"
        value={form.icon_url}
        onChange={(e) => setForm({ ...form, icon_url: e.target.value })}
      />
      <input
        type="url"
        placeholder="URL баннера"
        className="w-full p-2 rounded bg-gray-700"
        value={form.banner_url}
        onChange={(e) => setForm({ ...form, banner_url: e.target.value })}
      />
      <input
        type="url"
        placeholder="URL торрента"
        className="w-full p-2 rounded bg-gray-700"
        value={form.torrent_url}
        onChange={(e) => setForm({ ...form, torrent_url: e.target.value })}
        required
      />
      <input
        type="url"
        placeholder="URL фикса (опционально)"
        className="w-full p-2 rounded bg-gray-700"
        value={form.fix_url}
        onChange={(e) => setForm({ ...form, fix_url: e.target.value })}
      />
      <label className="block">
        Видимость:
        <input
          type="checkbox"
          checked={form.visible}
          onChange={(e) => setForm({ ...form, visible: e.target.checked })}
          className="ml-2"
        />
      </label>
      <input
        type="text"
        placeholder="ОС"
        className="w-full p-2 rounded bg-gray-700"
        value={form.requirements.os}
        onChange={(e) => setForm({ ...form, requirements: { ...form.requirements, os: e.target.value } })}
      />
      <input
        type="text"
        placeholder="Процессор"
        className="w-full p-2 rounded bg-gray-700"
        value={form.requirements.cpu}
        onChange={(e) => setForm({ ...form, requirements: { ...form.requirements, cpu: e.target.value } })}
      />
      <input
        type="text"
        placeholder="ОЗУ (GB)"
        className="w-full p-2 rounded bg-gray-700"
        value={form.requirements.ram}
        onChange={(e) => setForm({ ...form, requirements: { ...form.requirements, ram: e.target.value } })}
      />
      <input
        type="text"
        placeholder="Место (GB)"
        className="w-full p-2 rounded bg-gray-700"
        value={form.requirements.storage}
        onChange={(e) => setForm({ ...form, requirements: { ...form.requirements, storage: e.target.value } })}
      />
      <input
        type="text"
        placeholder="Видеокарта"
        className="w-full p-2 rounded bg-gray-700"
        value={form.requirements.gpu}
        onChange={(e) => setForm({ ...form, requirements: { ...form.requirements, gpu: e.target.value } })}
      />
      <button type="submit" className="w-full p-2 bg-blue-600 rounded">
        Сохранить
      </button>
    </form>
  );
};

module.exports = { default: GameForm };