import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from './Loader';

interface CalendarProps {
  loadingDelay: number;
}

const getNextMonthYear = (currentYear: number, currentMonth: number) => {
  if (currentMonth === 12) {
    return { year: currentYear + 1, month: 1 };
  }
  return { year: currentYear, month: currentMonth + 1 };
};

const getPreviousMonthYear = (currentYear: number, currentMonth: number) => {
  if (currentMonth === 1) {
    return { year: currentYear - 1, month: 12 };
  }
  return { year: currentYear, month: currentMonth - 1 };
};

const Calendar: React.FC<CalendarProps> = ({ loadingDelay = 600 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { year = new Date().getFullYear(), month = new Date().getMonth() + 1 } = useParams();
  const navigate = useNavigate();
  const today = new Date();

  const daysInMonth = new Date(+year, +month, 0).getDate();
  const firstDayOfMonth = new Date(+year, +month - 1, 1).getDay();
  const weeks: number[][] = [];

  useEffect(() => {
    setIsLoading(true);
    const fetchTasks = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, loadingDelay));
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [loadingDelay]);

  let currentWeek: number[] = Array(firstDayOfMonth).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    weeks.push([...currentWeek, ...Array(7 - currentWeek.length).fill(null)]);
  }

  const isToday = (day: number) => {
    return (
      day === today.getDate() && +month === today.getMonth() + 1 && +year === today.getFullYear()
    );
  };

  const goToToday = () => {
    navigate(`/${today.getFullYear()}/${today.getMonth() + 1}`);
  };

  const navigationStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #dee2e6'
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #dee2e6',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        flexDirection: 'column'
      }}
    >
      <div className="navigation" style={navigationStyle}>
        <button
          onClick={() => {
            const { year: prevYear, month: prevMonth } = getPreviousMonthYear(+year, +month);
            navigate(`/${prevYear}/${prevMonth}`);
          }}
          style={buttonStyle}
        >
          &lt;
        </button>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>
            {new Date(+year, +month - 1).toLocaleDateString('fr-FR', {
              month: 'long',
              year: 'numeric'
            })}
          </h2>
          <button
            onClick={goToToday}
            style={{
              ...buttonStyle,
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none'
            }}
          >
            Aujourd'hui
          </button>
        </div>
        <button
          onClick={() => {
            const { year: nextYear, month: nextMonth } = getNextMonthYear(+year, +month);
            navigate(`/${nextYear}/${nextMonth}`);
          }}
          style={buttonStyle}
        >
          &gt;
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            textAlign: 'center',
            borderBottom: '1px solid #dee2e6',
            padding: '8px 0'
          }}
        >
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
            <div key={day} style={{ fontWeight: 'bold' }}>
              {day}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {weeks.map((week, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)'
              }}
            >
              {week.map((day, j) => (
                <div
                  key={`${i}-${j}`}
                  style={{
                    border: '1px solid #dee2e6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isToday(day) ? '#e8f4ff' : 'transparent',
                    color: isToday(day) ? '#007bff' : 'inherit',
                    fontWeight: isToday(day) ? 'bold' : 'normal',
                    position: 'relative',
                    height: '100%'
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
