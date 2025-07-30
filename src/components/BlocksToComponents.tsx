import { useEffect } from "preact/hooks";
import Hero from "./Hero.tsx";
import { initializeVisualEditor } from "../lib/visual-editor.js";

interface Block {
  collection: string;
  item: any;
}

interface BlocksToComponentsProps {
  blocks: Block[];
}

export default function BlocksToComponents({
  blocks,
}: BlocksToComponentsProps) {
  // Initialize visual editor after all components are mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeVisualEditor();
    }, 500); // Give components time to fully render

    return () => clearTimeout(timer);
  }, []);

  const renderBlock = (block: Block, index: number) => {
    switch (block.collection) {
      case "block_hero":
        return (
          <Hero
            key={`${block.collection}-${block.item?.id || index}`}
            {...block}
          />
        );

      case "block_richtext":
        return (
          <div key={`${block.collection}-${block.item?.id || index}`}>
            <h2>Rich Text Block</h2>
            <p>Rich text content would go here</p>
          </div>
        );

      default:
        return (
          <div key={`${block.collection}-${block.item?.id || index}`}>
            <p>Unknown block type: {block.collection}</p>
          </div>
        );
    }
  };

  return <div>{blocks?.map((block, index) => renderBlock(block, index))}</div>;
}
