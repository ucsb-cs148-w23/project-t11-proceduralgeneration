import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import './style.css';

function getNestedHeadings(headingElements) {
    const nestedHeadings = [];
  
    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;
  
      if (heading.nodeName === "H2") {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        });
      }
    });
  
    return nestedHeadings;
};

function useHeadingsData() {
    const [nestedHeadings, setNestedHeadings] = useState([]);
  
    useEffect(() => {
      const headingElements = Array.from(
        document.querySelectorAll("h2:not(.title), h3:not(.title)")
      );
  
      const newNestedHeadings = getNestedHeadings(headingElements);
      setNestedHeadings(newNestedHeadings);
    }, []);
  
    return { nestedHeadings };
};

function Headings(props){
    
    const theme = useTheme();
    
    return (
        <ul>
        {props.headings.map((heading) => (
            <li key={heading.id}>
            <a
                href={`#${heading.id}`}
                className={theme.palette.mode === "dark" ? "a1White" : "a1Black"}
                onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${heading.id}`).scrollIntoView({
                    behavior: "smooth"
                    });
                }}
            >
                {heading.title}
            </a>
            {heading.items.length > 0 && (
                <ul>
                {heading.items.map((child) => (
                    <li key={child.id}>
                    <a 
                        href={`#${child.id}`}
                        className={theme.palette.mode === "dark" ? "a2White" : "a2Black"}
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector(`#${child.id}`).scrollIntoView({
                            behavior: "smooth"
                            });
                        }}
                    >
                        {child.title}
                    </a>
                    </li>
                ))}
                </ul>
            )}
            </li>
        ))}
        </ul>
    );
};

function TableOfContents(){
    
    const { nestedHeadings } = useHeadingsData();
    
    return(
      <nav aria-label="Table of contents" className="toc">
          <Headings headings={nestedHeadings} />
      </nav>
    );
}

export default TableOfContents;