/**
 * @file
 * @author Tomáš Chochola <tomaschochola@tomaschochola.cz>
 * @copyright © 2026 Tomáš Chochola <tomaschochola@tomaschochola.cz>
 *
 * @license CC-BY-ND-4.0
 *
 * @see {@link https://creativecommons.org/licenses/by-nd/4.0/} License
 * @see {@link https://github.com/tomaschochola} GitHub Profile
 * @see {@link https://github.com/sponsors/tomaschochola} GitHub Sponsors
 */

import '@fontsource-variable/atkinson-hyperlegible-next';
import './sample-a4.scss';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

const paragraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, neque vitae faucibus tincidunt, justo sem consequat nibh, vel feugiat augue erat sed lectus.',
  'Suspendisse potenti. Curabitur dignissim, mauris et malesuada tincidunt, purus sapien volutpat tortor, quis posuere nulla lorem vitae nisl.',
  'Praesent vitae justo sed enim hendrerit tristique. Aliquam erat volutpat. Nulla facilisi.',
] as const;

function SampleA4Document() {
  return (
    <main className="sample-a4-document">
      <h1>Sample A4 document</h1>

      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </main>
  );
}

const root = createRoot(document.body);

flushSync(() => {
  root.render(<SampleA4Document />);
});
