import { BarChart3, Bell, CalendarDays, Check, CircleDot, Home, Plus, Swords, Trophy, User, Users } from "lucide-react";

import type { StoryScreensCopy } from "./types";
import s from "./screens.module.css";

const ACTIVITY_STYLE = [
  { icon: Trophy, background: "rgba(255,176,32,.2)", color: "#ffb020" },
  { icon: Check, background: "rgba(46,229,157,.18)", color: "#2ee59d" },
  { icon: Users, background: "rgba(39,184,255,.18)", color: "#27b8ff" },
  { icon: Swords, background: "rgba(236,77,255,.18)", color: "#ec4dff" },
] as const;

const TAB_ICONS = [Home, CircleDot, Swords, Users, User] as const;

/** Arma2 home screen: greeting, quick actions, recent activity and tab bar. */
export function ScreenHome({ copy }: { copy: StoryScreensCopy["home"] }) {
  return (
    <div className={s.scr}>
      <div className={s.hTop}>
        <div className={s.hAv}>N</div>
        <div className={s.who}>
          <small className={s.xs}>{copy.hello}</small>
          <b className={s.lg}>Nico</b>
        </div>
        <div className={`${s.ib} ${s.bell}`}>
          <Bell className={s.icon} />
        </div>
      </div>

      <div className={`${s.lbl} ${s.sm}`}>{copy.quick}</div>
      <div className={s.quick}>
        <div className={s.qt}>
          <BarChart3 className={s.icon} />
          <span className={s.xs}>{copy.stats}</span>
        </div>
        <div className={`${s.qt} ${s.qtMain}`}>
          <span className={s.plus}>
            <Plus className={s.icon} />
          </span>
          <b className={s.sm}>{copy.newMatch}</b>
          <span className={s.xs} style={{ opacity: 0.8 }}>{copy.newMatchHint}</span>
        </div>
        <div className={s.qt}>
          <CalendarDays className={s.icon} />
          <span className={s.xs}>{copy.myMatches}</span>
        </div>
      </div>

      <div className={`${s.lbl} ${s.sm}`}>{copy.activity}</div>
      {copy.items.map((item, index) => {
        const { icon: Icon, background, color } = ACTIVITY_STYLE[index % ACTIVITY_STYLE.length];
        return (
          <div key={item.text} className={`${s.act} ${s.gc}`}>
            <span className={s.ai} style={{ background, color }}>
              <Icon className={s.icon} />
            </span>
            <span className={`${s.tx} ${s.sm}`}>
              {item.text}
              <small>{item.time}</small>
            </span>
          </div>
        );
      })}

      <div className={s.tabbar}>
        {copy.tabs.map((tab, index) => {
          const Icon = TAB_ICONS[index];
          return (
            <span key={tab} className={`${s.tab} ${index === 0 ? s.tabOn : ""}`}>
              <Icon className={s.icon} />
              <span className={s.xs}>{tab}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
