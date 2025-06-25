import "./Sidebar.css";
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import { useEffect, useState, useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';

const Sidebar = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    setSidebarClass(isSidebarOpen ? 'sidebar-change' : '');
  }, [isSidebarOpen]);

  const handleLinkClick = (id, sectionId) => {
    setActiveLinkIdx(id);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_two} alt="profile" />
        </div>
        <span className="info-name">Vishal Kumar</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((link) => (
            <li className="nav-item" key={link.id}>
              <a
                href={`#${link.sectionId}`}
                className={`nav-link ${link.id === activeLinkIdx ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id, link.sectionId);
                }}
              >
                <img src={link.image} className="nav-link-icon" alt={link.title} />
                <span className="nav-link-text">{link.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;