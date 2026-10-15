import { useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  ChefHat,
  Clock,
  Heart,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react'
import { aboutImages, categories, formatPrice, gallery, heroImage, resto, waLink } from './data'

const nav = [
  ['#menu', 'Menu'],
  ['#commander', 'Commander'],
  ['#reserver', 'Réserver'],
  ['#infos', 'Infos'],
]

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Pakopako, accueil">
      <span className="logo-mark">
        <ChefHat size={20} />
      </span>
      <span className="logo-text">Madame Pakopako</span>
    </a>
  )
}

function Header({ cartCount }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <Logo />
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {nav.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#commander" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
            <ShoppingBag size={16} /> Panier{cartCount > 0 && ` (${cartCount})`}
          </a>
        </nav>
        <button
          className="menu-btn"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img src={heroImage} alt="Terrasse du restaurant au bord de l'eau" className="hero-bg" />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <span className="eyebrow light">Restaurant · {resto.city}</span>
        <h1>{resto.tagline}</h1>
        <p className="hero-lead">{resto.intro}</p>
        <div className="hero-actions">
          <a href="#menu" className="btn btn-primary">
            Voir le menu
          </a>
          <a href="#reserver" className="btn btn-light">
            <CalendarDays size={18} /> Réserver une table
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  const points = [
    [ChefHat, 'Fait maison', 'Chaque plat est préparé le jour même avec des produits frais.'],
    [Heart, 'Accueil chaleureux', 'On vous reçoit comme à la maison, en famille ou entre amis.'],
    [Sun, 'Ambiance bord de mer', 'Un cadre détendu pour savourer et prendre son temps.'],
  ]
  return (
    <section className="section" id="apropos">
      <div className="container about">
        <div className="about-photos">
          <img src={aboutImages[0]} alt="Préparation d'un plat maison" loading="lazy" />
          <img src={aboutImages[1]} alt="Découpe de légumes frais" loading="lazy" />
        </div>
        <div>
          <span className="eyebrow">Bienvenue chez Pakopako</span>
          <h2>La cuisine de Madagascar rencontre les épices d’Orient</h2>
          <p className="lead">
            Chez Pakopako, on cuisine comme à la maison : des recettes malgaches transmises en famille et des
            saveurs orientales généreuses. {resto.slogan}
          </p>
          <ul className="points">
            {points.map(([Icon, title, text]) => (
              <li key={title}>
                <span className="point-icon">
                  <Icon size={20} />
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function MenuSection({ cart, setQty }) {
  const [active, setActive] = useState(categories[0].key)
  const cat = categories.find((c) => c.key === active)

  return (
    <section className="section section-alt" id="menu">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Notre carte</span>
          <h2>Le menu</h2>
          <p className="lead">Ajoutez vos plats au panier, puis envoyez votre commande sur WhatsApp en un clic.</p>
        </div>
        <div className="tabs" role="tablist">
          {categories.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={active === c.key}
              className={active === c.key ? 'active' : ''}
              onClick={() => setActive(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="dishes">
          {cat.dishes.map((d) => {
            const qty = cart[d.name] || 0
            return (
              <article className="dish" key={d.name}>
                <img src={d.image} alt={d.name} loading="lazy" />
                <div className="dish-body">
                  <div className="dish-top">
                    <h3>{d.name}</h3>
                    <span className="price">{formatPrice(d.price)}</span>
                  </div>
                  <p>{d.text}</p>
                  {qty === 0 ? (
                    <button className="btn btn-outline btn-sm" onClick={() => setQty(d.name, 1)}>
                      <Plus size={16} /> Ajouter
                    </button>
                  ) : (
                    <div className="qty">
                      <button aria-label={`Retirer un ${d.name}`} onClick={() => setQty(d.name, qty - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{qty}</span>
                      <button aria-label={`Ajouter un ${d.name}`} onClick={() => setQty(d.name, qty + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Order({ setQty, items, total }) {
  const [mode, setMode] = useState('Livraison')
  const message =
    `Bonjour Pakopako ! Je voudrais commander :\n` +
    items.map((i) => `- ${i.qty} x ${i.name} (${formatPrice(i.price * i.qty)})`).join('\n') +
    `\nTotal : ${formatPrice(total)}\nMode : ${mode}`

  return (
    <section className="section" id="commander">
      <div className="container order">
        <div>
          <span className="eyebrow">Commander</span>
          <h2>Votre commande en 3 étapes</h2>
          <ol className="steps">
            <li>
              <b>1</b> Choisissez vos plats dans le menu
            </li>
            <li>
              <b>2</b> Choisissez livraison, à emporter ou sur place
            </li>
            <li>
              <b>3</b> Envoyez votre commande sur WhatsApp
            </li>
          </ol>
          <p className="muted">
            Vous préférez appeler ? <a href={`tel:${resto.phoneLink}`}>{resto.phone}</a>
          </p>
        </div>
        <div className="cart">
          <h3>
            <ShoppingBag size={20} /> Votre panier
          </h3>
          {items.length === 0 ? (
            <p className="muted">
              Votre panier est vide. <a href="#menu">Voir le menu</a>
            </p>
          ) : (
            <>
              <ul className="cart-list">
                {items.map((i) => (
                  <li key={i.name}>
                    <span>
                      {i.qty} × {i.name}
                    </span>
                    <span className="cart-right">
                      {formatPrice(i.price * i.qty)}
                      <button aria-label={`Retirer ${i.name}`} onClick={() => setQty(i.name, 0)}>
                        <X size={14} />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <div className="modes">
                {['Livraison', 'À emporter', 'Sur place'].map((m) => (
                  <button key={m} className={mode === m ? 'active' : ''} onClick={() => setMode(m)}>
                    {m}
                  </button>
                ))}
              </div>
              <a className="btn btn-whatsapp" href={waLink(message)} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> Commander sur WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function Reservation() {
  const [f, setF] = useState({ name: '', date: '', time: '', people: '2', note: '' })
  const up = (e) => setF({ ...f, [e.target.name]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const text =
      `Bonjour Pakopako ! Je souhaite réserver une table.\n` +
      `Nom : ${f.name}\nDate : ${f.date} à ${f.time}\nPersonnes : ${f.people}` +
      (f.note ? `\nRemarque : ${f.note}` : '')
    window.open(waLink(text), '_blank', 'noopener')
  }
  return (
    <section className="section section-dark" id="reserver">
      <div className="container resa">
        <div>
          <span className="eyebrow light">Réservation</span>
          <h2>Réservez votre table</h2>
          <p className="lead">Anniversaire, repas de famille ou dîner à deux : on vous garde la meilleure place.</p>
        </div>
        <form className="resa-form" onSubmit={submit}>
          <label className="full">
            Votre nom
            <input name="name" required value={f.name} onChange={up} placeholder="Nom et prénom" />
          </label>
          <label>
            Date
            <input type="date" name="date" required value={f.date} onChange={up} />
          </label>
          <label>
            Heure
            <input type="time" name="time" required value={f.time} onChange={up} />
          </label>
          <label>
            Personnes
            <select name="people" value={f.people} onChange={up}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <label className="full">
            Remarque (facultatif)
            <input name="note" value={f.note} onChange={up} placeholder="Anniversaire, chaise bébé…" />
          </label>
          <button className="btn btn-primary full" type="submit">
            <MessageCircle size={18} /> Envoyer la demande sur WhatsApp
          </button>
        </form>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Galerie</span>
          <h2>Ça donne faim, non ?</h2>
        </div>
        <div className="gallery">
          {gallery.map((src, i) => (
            <img key={src} src={src} alt={`Photo ${i + 1} du restaurant`} loading="lazy" className={i === 0 ? 'big' : ''} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Infos() {
  return (
    <section className="section section-alt" id="infos">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Infos pratiques</span>
          <h2>Venez nous voir</h2>
        </div>
        <div className="infos">
          <div className="info-card">
            <Clock />
            <h3>Horaires</h3>
            {resto.hours.map(([d, h]) => (
              <p key={d} className="hours">
                <span>{d}</span>
                <b>{h}</b>
              </p>
            ))}
          </div>
          <div className="info-card">
            <MapPin />
            <h3>Adresse</h3>
            <p>{resto.city}</p>
            <a className="link" href="https://maps.google.com/?q=Antananarivo" target="_blank" rel="noreferrer">
              Itinéraire Google Maps →
            </a>
          </div>
          <div className="info-card">
            <Phone />
            <h3>Contact</h3>
            <p>
              <a href={`tel:${resto.phoneLink}`}>{resto.phone}</a>
            </p>
            <p>
              <a href={`mailto:${resto.email}`}>{resto.email}</a>
            </p>
            <a className="link" href={resto.facebook} target="_blank" rel="noreferrer">
              Page Facebook →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Logo />
        <p>
          © {new Date().getFullYear()} Pakopako · {resto.slogan}
        </p>
        <p className="credit">
          Site réalisé par{' '}
          <a href="https://kreadis-digital.vercel.app/" target="_blank" rel="noreferrer">
            Kreadis
          </a>
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const [cart, setCart] = useState({})
  const setQty = (name, qty) =>
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[name]
      else next[name] = qty
      return next
    })

  const allDishes = useMemo(() => categories.flatMap((c) => c.dishes), [])
  const items = Object.entries(cart).map(([name, qty]) => ({
    name,
    qty,
    price: allDishes.find((d) => d.name === name).price,
  }))
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <div className="demo-bar">Maquette de démonstration proposée par Kreadis · contenus et prix indicatifs</div>
      <Header cartCount={count} />
      <main>
        <Hero />
        <About />
        <MenuSection cart={cart} setQty={setQty} />
        <Order setQty={setQty} items={items} total={total} />
        <Reservation />
        <Gallery />
        <Infos />
      </main>
      <Footer />
      {count > 0 && (
        <a href="#commander" className="cart-float">
          <ShoppingBag size={18} /> {count} article{count > 1 ? 's' : ''} · {formatPrice(total)}
        </a>
      )}
      <a className="wa-float" href={waLink('Bonjour Pakopako !')} target="_blank" rel="noreferrer" aria-label="Écrire sur WhatsApp">
        <MessageCircle size={26} />
      </a>
    </>
  )
}
