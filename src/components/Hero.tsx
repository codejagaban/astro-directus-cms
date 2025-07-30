import { setAttr } from "../lib/visual-editor.js";
import styles from "./Hero.module.css";

interface HeroProps {
  id: string;
  sort: number;
  collection: string;
  hide_block: boolean;
  background: string;
  item: {
    headline: string;
    id: string;
    description: string;
    tagline: string;
    layout: "image_right" | "image_left" | "image_center" | null;
    image?: {
      id: string;
      storage: string;
      filename_disk: string;
      width: number;
      height: number;
      title: string;
    };
    button_group?: {
      id: string;
      sort: number | null;
      buttons: Array<{
        id: string;
        label: string;
        url?: string;
        variant: string;
        page?: {
          permalink: string;
        };
        post?: {
          slug: string;
        };
      }>;
    };
  };
}

export default function Hero({
  background,
  item: { id, headline, description, tagline, layout, image, button_group },
}: HeroProps) {
  const DIRECTUS_URL = "http://localhost:8055";

  return (
    <section
      className={`${styles.hero} ${background} ${layout} ${styles.image_right}`}
    >
      <div className={styles.heroContent}>
        {tagline && (
          <span
            className={styles.tagline}
            // Add the following attribute
            data-directus={setAttr({
              collection: "block_hero",
              item: id,
              fields: "tagline",
              mode: "popover",
            })}
          >
            {tagline}
          </span>
        )}

        {headline && (
          <h1
            data-directus={setAttr({
              collection: "block_hero",
              item: id,
              fields: "headline",
              mode: "popover",
            })}
          >
            {headline}
          </h1>
        )}

        {description && (
          <p
            data-directus={setAttr({
              collection: "block_hero",
              item: id,
              fields: "description",
              mode: "popover",
            })}
          >
            {description}
          </p>
        )}

        {button_group?.buttons && (
          <div
            className={styles.buttonGroup}
            data-directus={setAttr({
              collection: "block_hero",
              item: id,
              fields: "button_group",
              mode: "popover",
            })}
          >
            {button_group.buttons.map((button, index) => (
              <a
                key={index}
                href={
                  button.url ||
                  button.page?.permalink ||
                  button.post?.slug ||
                  "#"
                }
                target={button.url ? "_blank" : "_self"}
                className={styles.button}
              >
                {button.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {image && (
        <div className={styles.heroImageContainer}>
          <img
            src={`${DIRECTUS_URL}/assets/${image.filename_disk}`}
            alt={image.title}
            width={image.width}
            height={image.height}
            className={styles.heroImage}
            data-directus={setAttr({
              collection: "block_hero",
              item: id,
              fields: "image",
              mode: "modal",
            })}
          />
        </div>
      )}
    </section>
  );
}
