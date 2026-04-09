import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CodeBlock } from '@/components/ui/CodeBlock';

const agentSetup = [
  { agent: 'Claude Code', cmd: 'claude plugin marketplace add Gentleman-Programming/engram && claude plugin install engram' },
  { agent: 'OpenCode', cmd: 'engram setup opencode' },
  { agent: 'Gemini CLI', cmd: 'engram setup gemini-cli' },
  { agent: 'Codex', cmd: 'engram setup codex' },
  { agent: 'VS Code', cmd: "code --add-mcp '{\"name\":\"engram\",\"command\":\"engram\",\"args\":[\"mcp\"]}'" },
];

export function Installation() {
  return (
    <Section id="installation" variant="muted">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-text] mb-4">
              Up and running in{' '}
              <span className="text-[--color-mauve]">60 seconds</span>
            </h2>
            <p className="text-lg text-[--color-subtext0]">
              No Node.js. No Python. No Docker. Just one binary.
            </p>
          </div>

          {/* Steps as connected nodes */}
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-4 top-8 bottom-8 w-px bg-gradient-to-b from-[--color-mauve]/50 via-[--color-mauve]/30 to-[--color-green]/50 hidden sm:block" />

            {/* Step 1 */}
            <div className="relative pl-0 sm:pl-12 pb-10">
              {/* Node indicator */}
              <div className="hidden sm:flex absolute left-0 top-0 w-8 h-8 rounded-full bg-[--color-mauve] items-center justify-center text-[--color-base] font-bold text-sm shadow-[0_0_15px_#cba6f7]/50">
                1
              </div>
              <div className="sm:hidden w-8 h-8 rounded-full bg-[--color-mauve] flex items-center justify-center text-[--color-base] font-bold text-sm mb-4 shadow-[0_0_15px_#cba6f7]/50">
                1
              </div>
              
              <h3 className="text-lg font-semibold text-[--color-text] mb-4">Install engram</h3>
              <div className="rounded-2xl overflow-hidden border border-[--color-surface1]/50 shadow-lg shadow-black/10">
                <CodeBlock code="brew install gentleman-programming/tap/engram" filename="macOS / Linux via Homebrew" />
              </div>
              <p className="text-sm text-[--color-subtext0] mt-3">
                Windows, Linux (apt/deb/rpm) and manual install →{' '}
                <a
                  href="https://github.com/Gentleman-Programming/engram/blob/main/docs/INSTALLATION.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--color-mauve] hover:text-[--color-pink] transition-colors underline underline-offset-2"
                >
                  docs/INSTALLATION.md
                </a>
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative pl-0 sm:pl-12 pb-10">
              <div className="hidden sm:flex absolute left-0 top-0 w-8 h-8 rounded-full bg-[--color-mauve] items-center justify-center text-[--color-base] font-bold text-sm shadow-[0_0_15px_#cba6f7]/50">
                2
              </div>
              <div className="sm:hidden w-8 h-8 rounded-full bg-[--color-mauve] flex items-center justify-center text-[--color-base] font-bold text-sm mb-4 shadow-[0_0_15px_#cba6f7]/50">
                2
              </div>
              
              <h3 className="text-lg font-semibold text-[--color-text] mb-4">Connect your agent</h3>
              <div className="rounded-2xl overflow-hidden border border-[--color-surface1]/50 divide-y divide-[--color-surface1]/50 shadow-lg shadow-black/10 bg-[--color-surface0]/50 backdrop-blur-sm">
                {agentSetup.map((item) => (
                  <div key={item.agent} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3 hover:bg-[--color-surface0]/80 transition-colors">
                    <span className="text-sm font-semibold text-[--color-mauve] sm:w-28 flex-shrink-0">{item.agent}</span>
                    <code className="text-xs text-[--color-subtext0] font-mono break-all">{item.cmd}</code>
                  </div>
                ))}
                <div className="flex items-center gap-4 px-4 py-3 hover:bg-[--color-surface0]/80 transition-colors">
                  <span className="text-sm font-semibold text-[--color-mauve] sm:w-28 flex-shrink-0">Cursor / Windsurf</span>
                  <a
                    href="https://github.com/Gentleman-Programming/engram/blob/main/docs/AGENT-SETUP.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[--color-subtext0] hover:text-[--color-mauve] transition-colors"
                  >
                    → docs/AGENT-SETUP.md
                  </a>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-0 sm:pl-12">
              <div className="hidden sm:flex absolute left-0 top-0 w-8 h-8 rounded-full bg-[--color-green] items-center justify-center text-[--color-base] font-bold text-sm shadow-[0_0_15px_#a6e3a1]/50">
                ✓
              </div>
              <div className="sm:hidden w-8 h-8 rounded-full bg-[--color-green] flex items-center justify-center text-[--color-base] font-bold text-sm mb-4 shadow-[0_0_15px_#a6e3a1]/50">
                ✓
              </div>
              
              <h3 className="text-lg font-semibold text-[--color-text] mb-4">That&apos;s it. Your AI now remembers.</h3>
              <div className="rounded-2xl overflow-hidden border border-[--color-surface1]/50 shadow-lg shadow-black/10">
                <CodeBlock code={`engram serve\n# HTTP API on http://127.0.0.1:7437\n# MCP server ready for your agent`} />
              </div>
            </div>
          </div>

          {/* Requirements — card style */}
          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-[--color-surface0]/80 to-[--color-crust]/80 border border-[--color-surface1]/50 backdrop-blur-sm">
            <h4 className="font-semibold text-[--color-text] mb-4">Requirements</h4>
            <ul className="space-y-3 text-[--color-subtext0] text-sm">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[--color-green] shadow-[0_0_8px_#a6e3a1]" />
                Go 1.21 or later
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[--color-green] shadow-[0_0_8px_#a6e3a1]" />
                SQLite (embedded — no installation needed)
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[--color-green] shadow-[0_0_8px_#a6e3a1]" />
                Any MCP-compatible AI agent
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
