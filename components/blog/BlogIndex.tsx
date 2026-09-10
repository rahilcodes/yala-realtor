"use client";

import { useState } from "react";
import type { Post, PostCategory } from "@/types/listing";
import { Photo } from "@/components/Photo";

type Cat = "All" | PostCategory;

interface Props {
  posts: Post[];
  categories: Cat[];
}

/** Category filter pills + featured card (All only) + article grid. */
export function BlogIndex({ posts, categories }: Props) {
  const [cat, setCat] = useState<Cat>("All");
  const isAll = cat === "All";
  const filtered = isAll ? posts : posts.filter((p) => p.cat === cat);
  const featured = isAll ? filtered[0] : undefined;
  const grid = isAll ? filtered.slice(1) : filtered;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-[640px]">
          <div className="eyebrow">Blog</div>
          <h1 className="h-display mt-3.5" style={{ fontSize: "clamp(36px, 4.5vw, 54px)" }}>
            Market insights
          </h1>
          <p className="mt-3.5 text-[17px] leading-[1.6] text-slate-2">
            Orange County pricing, neighborhoods, and the practical side of buying and selling, written by Butchi.
          </p>
        </div>
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className="pill min-h-11">
              {c}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {isAll ? `Showing all ${posts.length} articles.` : `Showing ${filtered.length} ${cat} article${filtered.length === 1 ? "" : "s"}.`}
      </div>

      {featured && (
        <a
          id={featured.slug}
          href={`#${featured.slug}`}
          className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-8 overflow-hidden rounded-[20px] border border-border bg-cloud text-navy no-underline transition-shadow hover:shadow-card"
        >
          <Photo label={featured.photo} className="h-full min-h-[340px]" priority sizes="(max-width: 800px) 100vw, 600px" />
          <div className="flex flex-col gap-3.5" style={{ padding: "clamp(24px, 3vw, 44px)" }}>
            <div className="flex flex-wrap items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-gold-deep">
              Featured · {featured.cat}
              <span className="font-medium normal-case tracking-normal text-meta">
                {featured.date} · {featured.read} read
              </span>
            </div>
            <h2 className="m-0 font-serif font-medium leading-[1.15] tracking-[-0.02em] text-pretty" style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>
              {featured.title}
            </h2>
            <p className="m-0 text-[16px] leading-[1.6] text-slate-2">{featured.excerpt}</p>
            <span className="text-[14px] font-bold">Read the article →</span>
          </div>
        </a>
      )}

      {grid.length > 0 && (
        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-[22px] gap-y-7">
          {grid.map((p) => (
            <a key={p.slug} id={p.slug} href={`#${p.slug}`} className="flex flex-col gap-3 rounded-xl text-navy no-underline" style={{ outlineOffset: 4 }}>
              <Photo label={p.photo} className="aspect-[16/10] rounded-xl" sizes="(max-width: 700px) 100vw, 380px" />
              <div className="flex flex-wrap items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-gold-deep">
                {p.cat}
                <span className="font-medium normal-case tracking-normal text-meta">
                  {p.date} · {p.read}
                </span>
              </div>
              <h3 className="m-0 font-serif text-[22px] font-medium leading-[1.25] text-pretty">{p.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-slate-2">{p.excerpt}</p>
            </a>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="mt-12 rounded-[14px] border border-dashed border-border-input p-10 text-center text-[15px] font-medium text-meta">
          No articles in this category yet.
        </div>
      )}
    </>
  );
}
