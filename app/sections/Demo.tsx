'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Save, Search, BarChart3, Sparkles } from 'lucide-react';

const saveExample = `// Agent saves a decision after implementing auth
import { mem_save } from '@engram/mcp';

await mem_save({
  title: "Switched from sessions to JWT",
  type: "decision",
  content: \`
    What: Replaced express-session with jsonwebtoken
    Why: Session storage doesn't scale across instances
    Where: src/middleware/auth.ts, src/routes/login.ts
    Learned: Must set httpOnly and secure flags
  \`,
  project: "my-project"
});`;

const searchExample = `// Agent searches for previous auth decisions
import { mem_search } from '@engram/mcp';

const results = await mem_search({
  query: "JWT auth middleware",
  type: "decision",
  project: "my-project"
});

console.log(results.observations);`;

const timelineExample = `// Agent drills into chronological context
import { mem_timeline } from '@engram/mcp';

const context = await mem_timeline({
  observation_id: 42,
  before: 5,  // 5 observations before
  after: 5    // 5 observations after
});`;

export function Demo() {
  return (
    <Section id="demo">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-text] mb-4">
            See it in <span className="text-[--color-mauve]">action</span>
          </h2>
          <p className="text-lg text-[--color-subtext0] max-w-2xl mx-auto">
            Three simple MCP tools give your agent everything it needs: save memories, search them, and explore timeline context.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Code examples */}
          <div className="space-y-8 w-full min-w-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[--color-mauve] flex items-center justify-center text-[--color-base] font-bold text-sm">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[--color-text]">Save memories</h3>
              </div>
              <CodeBlock code={saveExample} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[--color-blue] flex items-center justify-center text-[--color-base] font-bold text-sm">
                  2
                </div>
                <h3 className="text-xl font-semibold text-[--color-text]">Search across all memories</h3>
              </div>
              <CodeBlock code={searchExample} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[--color-pink] flex items-center justify-center text-[--color-base] font-bold text-sm">
                  3
                </div>
                <h3 className="text-xl font-semibold text-[--color-text]">Explore timeline context</h3>
              </div>
              <CodeBlock code={timelineExample} />
            </div>
          </div>

          {/* Right: Visual flow */}
          <div className="w-full lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
            <div className="bg-[--color-surface0] rounded-2xl p-6 sm:p-8 border border-[--color-surface1] shadow-lg shadow-black/10 w-full">
              <h3 className="text-xl font-semibold text-[--color-text] mb-6">
                Memory Connection Flow
              </h3>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[--color-mauve]/20 border border-[--color-mauve]/30 flex items-center justify-center text-[--color-mauve]">
                    <Save className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[--color-text] font-medium">mem_save</div>
                    <div className="text-sm text-[--color-subtext0]">Store decision, bugfix, or pattern</div>
                  </div>
                </div>

                <div className="ml-5 w-px h-8 bg-[--color-mauve]/30" />

                {/* Step 2 */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[--color-blue]/20 border border-[--color-blue]/30 flex items-center justify-center text-[--color-blue]">
                    <Search className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[--color-text] font-medium">mem_search</div>
                    <div className="text-sm text-[--color-subtext0]">Find relevant memories instantly</div>
                  </div>
                </div>

                <div className="ml-5 w-px h-8 bg-[--color-blue]/30" />

                {/* Step 3 */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[--color-pink]/20 border border-[--color-pink]/30 flex items-center justify-center text-[--color-pink]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[--color-text] font-medium">mem_timeline</div>
                    <div className="text-sm text-[--color-subtext0]">Explore chronological context</div>
                  </div>
                </div>

                <div className="ml-5 w-px h-8 bg-[--color-pink]/30" />

                {/* Result */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[--color-green]/20 border border-[--color-green]/30 flex items-center justify-center text-[--color-green]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[--color-green] font-medium">Context Retrieved</div>
                    <div className="text-sm text-[--color-subtext0]">Agent has full context to continue work</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
