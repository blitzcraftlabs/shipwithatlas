import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HomeSection } from "@/components/home/home-section";
import {
  AUTHOR_AVATAR_URL,
  AUTHOR_NAME,
  AUTHOR_ROLE,
  AUTHOR_SITE_URL,
  CONSULTING_PATH,
} from "@/lib/marketing/constants";
import { BUILT_WITH_PRODUCTS } from "@/lib/marketing/content/products";

export function MakerSection() {
  return (
    <HomeSection id="about" label="Who builds it" title="Where Atlas comes from.">
      <div className="home-maker">
        <div className="home-maker__note">
          <p>
            I&apos;m {AUTHOR_NAME}, a frontend engineer and consultant. Atlas is the setup I kept
            rebuilding on client projects: the same API client, the same auth flow, the same lint
            rules and CI checks. It now lives in one repository, with the reasoning written next to
            the code.
          </p>
          <p>
            It is opinionated on purpose. Where a reasonable default existed, Atlas picks one and
            documents why, so you can disagree with a specific decision instead of rediscovering all
            of them.
          </p>
          <p>
            If your team wants help applying the same approach to an existing frontend, that is the
            consulting work I do.
          </p>

          <div className="home-maker__byline">
            <Image
              src={AUTHOR_AVATAR_URL}
              alt=""
              width={40}
              height={40}
              className="home-maker__avatar"
            />
            <div>
              <a
                href={AUTHOR_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="home-maker__name"
              >
                {AUTHOR_NAME}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="home-maker__role">{AUTHOR_ROLE}</p>
            </div>
            <Link href={CONSULTING_PATH} className="home-link home-maker__consulting">
              How I work with teams
              <ArrowRight className="home-link__arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="home-maker__products">
          <h3 className="home-start__subtitle">Running on Atlas</h3>
          <ul className="home-products">
            {BUILT_WITH_PRODUCTS.map((product) => (
              <li key={product.name}>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-products__link"
                >
                  <span className="home-products__brand">
                    <img
                      src={product.logoSrc}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={`home-products__logo home-products__logo--${product.logoVariant}`}
                    />
                    {"showName" in product && product.showName ? (
                      <span className="home-products__name">{product.name}</span>
                    ) : (
                      <span className="sr-only">{product.name}</span>
                    )}
                  </span>
                  <span className="home-products__status">
                    {product.status === "built-from-atlas"
                      ? "Built on Atlas"
                      : "Migrating to Atlas"}
                  </span>
                  <ArrowUpRight className="home-products__arrow" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeSection>
  );
}
