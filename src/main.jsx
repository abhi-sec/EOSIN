import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const locations = {
  'Pune, Maharashtra': { temp: 28, condition: 'Partly cloudy', humidity: 64, wind: 14, rain: 22, crop: 'Soybean', stage: 'Flowering', soil: 58, status: 'Watch closely' },
  'Nashik, Maharashtra': { temp: 25, condition: 'Light rain', humidity: 78, wind: 9, rain: 68, crop: 'Grapes', stage: 'Fruit set', soil: 71, status: 'Good conditions' },
  'Indore, Madhya Pradesh': { temp: 30, condition: 'Sunny intervals', humidity: 49, wind: 18, rain: 12, crop: 'Wheat', stage: 'Tillering', soil: 43, status: 'Irrigate soon' },
}

const forecast = [
  ['Today', '☼', 28, 22, 22], ['Tue', '☁', 27, 21, 35], ['Wed', '☂', 25, 20, 68], ['Thu', '☁', 26, 19, 44], ['Fri', '☼', 29, 20, 18], ['Sat', '☼', 30, 21, 10], ['Sun', '☁', 28, 20, 27],
]

function App() {
  const [location, setLocation] = useState('Pune, Maharashtra')
  const [range, setRange] = useState('7 days')
  const [showDetails, setShowDetails] = useState(false)
  const [tasks, setTasks] = useState(['irrigation', 'scouting'])
  const data = locations[location]
  const chartPoints = useMemo(() => forecast.map((day, i) => `${i * 16.6 + 1},${66 - (day[2] - 18) * 4}`).join(' '), [])

  const complete = (id) => setTasks((current) => current.includes(id) ? current.filter((task) => task !== id) : [...current, id])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">e</span><span>EOSIN</span></div>
        <div className="brand-caption">Farming intelligence</div>
        <nav className="nav-list" aria-label="Primary navigation">
          <a className="nav-item active" href="#overview"><span>⌂</span> Overview</a>
          <a className="nav-item" href="#patterns"><span>◌</span> Weather patterns</a>
          <a className="nav-item" href="#recommendation"><span>✦</span> Recommendations <b>1</b></a>
          <a className="nav-item" href="#farm"><span>◒</span> My farm</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-icon">?</span><div><strong>Need a hand?</strong><p>Talk to an EOSIN agronomist.</p><button>Get support <span>→</span></button></div></div>
          <div className="account"><div className="avatar">AS</div><div><strong>Arjun Singh</strong><small>Farm manager</small></div><span className="more">•••</span></div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar"><div className="mobile-brand"><span className="brand-mark">e</span> EOSIN</div><div className="breadcrumbs">Overview <span>/</span> Farm dashboard</div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<i></i></button><button className="mobile-menu" aria-label="Open menu">☰</button></div></header>
        <div className="page-content">
          <section className="welcome-row"><div><p className="eyebrow">TUESDAY, 14 MAY 2024</p><h1>Good morning, Arjun <span>✦</span></h1><p className="muted">Here’s what the sky and soil are telling us today.</p></div><div className="location-control"><span>⌖</span><select value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Choose farm location">{Object.keys(locations).map((name) => <option key={name}>{name}</option>)}</select><span>⌄</span></div></section>

          <section className="hero-grid">
            <article className="weather-card card"><div className="card-top"><div><span className="label">CURRENT CONDITIONS</span><h2>{data.condition}</h2><p>Feels like {data.temp + 1}° · Updated 8:42 AM</p></div><div className="weather-symbol">☼</div></div><div className="temperature"><strong>{data.temp}°</strong><span>C</span></div><div className="weather-stats"><div><span>Humidity</span><strong>{data.humidity}%</strong></div><div><span>Wind</span><strong>{data.wind} km/h</strong></div><div><span>Rain chance</span><strong>{data.rain}%</strong></div></div></article>
            <article className="disruption-card card" id="patterns"><div className="card-top"><div><span className="label">PATTERN DISRUPTION</span><h2>Conditions are shifting</h2></div><span className="status-tag warning"><i></i>{data.status}</span></div><p className="disruption-copy">Rainfall is <strong>18% below</strong> the usual level for this week. A warmer, drier window is forming over the next 5 days.</p><div className="comparison"><div><span>This season</span><strong>42 mm</strong><div className="bar"><i style={{ width: '42%' }}></i></div></div><div><span>Typical</span><strong>51 mm</strong><div className="bar pale"><i style={{ width: '51%' }}></i></div></div></div><button className="text-button" onClick={() => setShowDetails(true)}>View pattern analysis <span>→</span></button></article>
          </section>

          <section className="content-grid">
            <article className="recommendation-card card" id="recommendation"><div className="recommendation-heading"><div className="sparkle">✦</div><div><span className="label">EOSIN RECOMMENDS</span><h2>Hold irrigation for 48 hours</h2></div><span className="confidence">92% confidence</span></div><p className="recommendation-copy">The next two days have enough overnight humidity to protect your {data.crop.toLowerCase()} crop. Use this window to scout for pests and prepare a light irrigation cycle for Thursday morning.</p><div className="rec-meta"><div><span>Best action window</span><strong>Thu, 6:00–9:00 AM</strong></div><div><span>Expected impact</span><strong>Save ~1,200 L / acre</strong></div></div><button className="primary-button" onClick={() => setShowDetails(true)}>See recommendation details <span>↗</span></button></article>
            <article className="farm-card card" id="farm"><div className="card-top"><div><span className="label">YOUR FARM</span><h2>{data.crop} · {data.stage}</h2></div><button className="edit-button" aria-label="Edit farm details">✎</button></div><div className="soil-row"><div className="soil-gauge"><div style={{ '--soil': `${data.soil}%` }}><strong>{data.soil}%</strong></div></div><div><span className="label">SOIL MOISTURE</span><h3>{data.soil > 60 ? 'Healthy range' : 'Needs attention'}</h3><p>Last measured today at 7:15 AM</p></div></div><div className="task-list"><div className="task-title"><span>Today’s checklist</span><small>{tasks.length}/2 complete</small></div><button className={tasks.includes('irrigation') ? 'task done' : 'task'} onClick={() => complete('irrigation')}><span>{tasks.includes('irrigation') ? '✓' : ''}</span><div><strong>Review irrigation plan</strong><small>Use Thursday’s morning window</small></div></button><button className={tasks.includes('scouting') ? 'task done' : 'task'} onClick={() => complete('scouting')}><span>{tasks.includes('scouting') ? '✓' : ''}</span><div><strong>Scout north field</strong><small>Check lower leaves for pests</small></div></button></div></article>
          </section>

          <section className="forecast-card card"><div className="forecast-heading"><div><span className="label">WEATHER OUTLOOK</span><h2>Plan around the week ahead</h2></div><div className="range-tabs"><button className={range === '7 days' ? 'selected' : ''} onClick={() => setRange('7 days')}>7 days</button><button className={range === '14 days' ? 'selected' : ''} onClick={() => setRange('14 days')}>14 days</button></div></div><div className="chart"><div className="chart-y"><span>35°</span><span>30°</span><span>25°</span><span>20°</span></div><div className="chart-body"><div className="grid-lines"><i></i><i></i><i></i><i></i></div><svg viewBox="0 0 100 70" preserveAspectRatio="none" aria-label="Temperature trend chart"><polyline points={chartPoints} fill="none" stroke="#d88943" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /><polyline points="1,58 17,50 34,55 50,47 67,53 83,59 99,54" fill="none" stroke="#77a98a" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg><div className="forecast-days">{forecast.map((day) => <div key={day[0]}><strong>{day[0]}</strong><span className="forecast-icon">{day[1]}</span><b>{day[2]}° <em>{day[3]}°</em></b><small>{day[4]}% rain</small></div>)}</div></div></div></section>
          <footer><span>EOSIN · Intelligence for a changing climate</span><span>Data is simulated for this preview</span></footer>
        </div>
      </main>
      {showDetails && <div className="modal-backdrop" role="presentation" onClick={() => setShowDetails(false)}><div className="modal card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}><button className="close" onClick={() => setShowDetails(false)} aria-label="Close details">×</button><span className="label">PATTERN ANALYSIS</span><h2 id="modal-title">Why EOSIN recommends a pause</h2><p>Our model compares live conditions with a 10-year seasonal baseline, soil moisture, and the next rainfall probability. For {location}, the current dry spell is short and humidity remains elevated overnight.</p><div className="modal-insight"><span>↗</span><div><strong>Recommended next step</strong><p>Scout today, then irrigate lightly Thursday morning if the soil moisture falls below 45%.</p></div></div><button className="primary-button" onClick={() => setShowDetails(false)}>Got it</button></div></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
