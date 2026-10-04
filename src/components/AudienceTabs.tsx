"use client";

import { useRef, useState } from "react";
import { audienceTabs } from "@/lib/content";

export function AudienceTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activate = (index: number, focus = false) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | undefined;
    if (event.key === "ArrowRight") next = (index + 1) % audienceTabs.length;
    if (event.key === "ArrowLeft") next = (index + audienceTabs.length - 1) % audienceTabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = audienceTabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      activate(next, true);
    }
  };

  return (
    <div className="audience-explorer">
      <div className="audience-tabs" role="tablist" aria-label="Tu manera de vivir el fútbol">
        {audienceTabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => activate(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {tab.tab}
          </button>
        ))}
      </div>
      {audienceTabs.map((tab, i) => (
        <div
          key={tab.id}
          className="audience-panel"
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          hidden={active !== i}
        >
          <span className="audience-kicker">{tab.kicker}</span>
          <h3>
            {tab.title.split("\n").map((line, idx, arr) => (
              <span key={idx}>
                {line}
                {idx < arr.length - 1 && <br />}
              </span>
            ))}
          </h3>
          <p>{tab.body}</p>
          <a className="text-link" href="#programa">
            Explorá el método ↗
          </a>
        </div>
      ))}
    </div>
  );
}
