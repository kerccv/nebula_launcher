const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

// Инициализация Supabase внутри App.jsx
const supabaseUrl = 'https://gvbkdacpiiqkwsutbyqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YmtkYWNwaWlxa3dzdXRieXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDc3MTksImV4cCI6MjA2Mjk4MzcxOX0.cWX8uKFDNDlvOF2zfwvXt1IzsqaPyxXEDhcSFCWcLuc';
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('register');
  const [maintenance, setMaintenance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        console.log('Fetching maintenance data...');
        const { data, error } = await supabase.from('maintenance').select('*').single();
        console.log('Maintenance response:', { data, error });
        if (error) throw error;
        if (data && data.active) setMaintenance(data);
      } catch (err) {
        console.error('Maintenance error:', err);
        setError('Ошибка загрузки данных техобслуживания: ' + err.message);
      }
    };
    checkMaintenance();

    const checkSession = async () => {
      try {
        console.log('Fetching session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Session response:', { session, error });
        if (error) throw error;
        if (session) {
          console.log('Fetching user data for email:', session.user.email);
          const { data, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('email', session.user.email)
            .single();
          if (userError) throw userError;
          setUser({ ...session.user, id: data.id });
          setView('library');
        }
      } catch (err) {
        console.error('Session error:', err);
        setError('Ошибка проверки сессии: ' + err.message);
      }
    };
    checkSession();
  }, []);

  const handleRegister = async (email, password) => {
    try {
      console.log('Registering user:', email);
      const { data, error } = await supabase.auth.signUp({ email, password });
      console.log('Register response:', { data, error });
      if (error) throw error;
      const userId = email === 'admin@example.com' ? '000000' : Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Inserting user into users table:', { id: userId, email });
      const { error: insertError } = await supabase.from('users').insert({ id: userId, email });
      if (insertError) throw insertError;
      setUser({ ...data.user, id: userId });
      setView('library');
    } catch (err) {
      console.error('Register error:', err);
      setError('Ошибка регистрации: ' + err.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      console.log('Logging in user:', email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log('Login response:', { data, error });
      if (error) throw error;
      console.log('Fetching user data for email:', data.user.email);
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', data.user.email)
        .single();
      if (userError) throw userError;
      setUser({ ...data.user, id: userData.id });
      setView('library');
    } catch (err) {
      console.error('Login error:', err);
      setError('Ошибка входа: ' + err.message);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center fade-in">
        <div className="card p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Ошибка</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (maintenance && maintenance.active) {
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
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center fade-in">
        <div className="card p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Nebula</h1>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 rounded bg-gray-700"
            id="email"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-2 mb-4 rounded bg-gray-700"
            id="password"
          />
          <button
            onClick={() => handleRegister(document.getElementById('email').value, document.getElementById('password').value)}
            className="w-full p-2 bg-blue-600 rounded mb-2"
          >
            Регистрация
          </button>
          <button
            onClick={() => handleLogin(document.getElementById('email').value, document.getElementById('password').value)}
            className="w-full p-2 bg-gray-600 rounded"
          >
            Вход
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex fade-in">
      <div className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-8">Nebula</h1>
        <button
          onClick={() => setView('library')}
          className="block w-full text-left p-2 hover:bg-gray-700 rounded"
        >
          Библиотека
        </button>
        <button
          onClick={() => setView('profile')}
          className="block w-full text-left p-2 hover:bg-gray-700 rounded"
        >
          Профиль
        </button>
        {user.id === '000000' && (
          <button
            onClick={() => setView('admin')}
            className="block w-full text-left p-2 hover:bg-gray-700 rounded"
          >
            Админ-панель
          </button>
        )}
      </div>
      <div className="flex-1 p-8">
        {view === 'library' && <div>Библиотека загружена</div>}
        {view === 'profile' && <div>Профиль загружен</div>}
        {view === 'admin' && user.id === '000000' && <div>Админ-панель загружена</div>}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);