import type { Metadata } from "next";
import { getPosts, POST_CATEGORIES } from "@/lib/data";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Market insights",
  description: "Southern California pricing, neighborhoods, and the practical side of buying and selling, written by Butchi.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <section className="container-1200 pt-16">
        <BlogIndex posts={posts} categories={POST_CATEGORIES} />
      </section>

      <section className="container-1200 mt-20 pb-[88px]">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-8 rounded-[20px] bg-navy text-white"
          style={{ padding: "clamp(28px, 4vw, 48px)" }}
        >
          <div>
            <div className="eyebrow-light">Monthly market brief</div>
            <h2 className="mt-3 font-serif font-medium leading-[1.15] tracking-[-0.02em]" style={{ fontSize: "clamp(26px, 3vw, 34px)" }}>
              The Southern California numbers, once a month, in one email.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-white/80">
              Median prices by city, days on market, inventory, and the three listings Butchi is watching. No fluff, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm source="blog-newsletter" layout="row" />
        </div>
      </section>
    </>
  );
}
