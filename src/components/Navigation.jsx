import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { id: "overview", label: "Overview", icon: "01" },
  { id: "big-o-intro", label: "Big O", icon: "02" },
  { id: "structures", label: "Structures", icon: "03" },
  { id: "languages", label: "Languages", icon: "04" },
  { id: "search-algorithms", label: "Search", icon: "05" },
  { id: "sort-algorithms", label: "Sorting", icon: "06" },
  { id: "databases", label: "Databases", icon: "07" },
];

const menuVariants = {
  closed: { transition: { staggerChildren: 0.035, staggerDirection: -1 } },
  open: { transition: { delayChildren: 0.04, staggerChildren: 0.055 } },
};

const itemVariants = {
  closed: { opacity: 0, y: 14, scale: 0.75, filter: "blur(4px)" },
  open: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 480, damping: 28 } },
};

function Navigation() {
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);
  const navigationRef = useRef(null);

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.35;
      let current = links[0].id;
      links.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) current = id;
      });
      setActive(current);
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const dismiss = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.type === "pointerdown" && navigationRef.current && !navigationRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, []);

  const current = links.find((link) => link.id === active) || links[0];

  return (
    <motion.nav className="fab-nav" ref={navigationRef} aria-label="Page sections" initial={false} animate={open ? "open" : "closed"}>
      <AnimatePresence>
        {open && (
          <motion.div className="fab-nav__menu" id="section-navigation" variants={menuVariants} initial="closed" animate="open" exit="closed">
            {links.map((link) => (
              <motion.a className={active === link.id ? "active" : ""} variants={itemVariants} href={`#${link.id}`} onClick={() => { setActive(link.id); setOpen(false); }} key={link.id} aria-current={active === link.id ? "location" : undefined}>
                <motion.span className="fab-nav__label" initial={false}>{link.label}{active === link.id && <i>Now</i>}</motion.span>
                <span className="fab-nav__action">{link.icon}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fab-nav__current" aria-hidden="true"><span>{current.icon}</span>{current.label}</div>
      <motion.button className="fab-nav__button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="section-navigation" aria-label={open ? "Close section navigation" : `Open section navigation. Current section: ${current.label}`} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }} transition={{ type: "spring", stiffness: 500, damping: 28 }}>
        <motion.span className="fab-nav__ring" animate={{ scale: open ? 1.16 : 1, opacity: open ? 0 : .45 }} transition={{ duration: .3 }} />
        <motion.i animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 520, damping: 28 }} />
        <motion.i animate={{ rotate: open ? -45 : 90 }} transition={{ type: "spring", stiffness: 520, damping: 28 }} />
      </motion.button>
    </motion.nav>
  );
}

export default Navigation;
