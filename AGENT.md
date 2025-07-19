# AGENT.md

## Build/Test Commands
- `bundle exec jekyll serve` - Start development server (http://localhost:4000)
- `bundle exec jekyll build` - Build static site to `_site/`
- `bundle install` - Install/update dependencies
- No specific test framework - this is a static Jekyll blog

## Architecture & Structure
- **Jekyll static site** using minimal-mistakes theme with GitHub Pages deployment
- **Content types**: Blog posts (`_posts/`), projects (`_projects/`), linklog (`_linklog/`), pages (`_pages/`)
- **Collections**: Posts, projects, linklog all have permalinks and feed generation
- **Plugins**: jekyll-paginate, jekyll-sitemap, jekyll-gist, jekyll-feed, jemoji, jekyll-include-cache
- **Analytics**: Google Analytics (G-KQGNGZL7KQ)

## Code Style & Content Guidelines
- **Front matter**: YAML with title, categories (Blog/Project), tags, optional image/excerpt
- **File naming**: YYYY-MM-DD-title-with-hyphens.md for posts
- **Images**: Store in `/assets/images/` and reference with full paths

## Content Writing Style (from STYLE_GUIDE.md)
- **Technical precision with accessibility**: Complex security concepts made understandable without oversimplification
- **Memorable metaphors**: Use vivid analogies ("remediation ballet", airplane cockpit for cloud configs)
- **Informal authority**: Self-deprecating humor ("two blog readers", "unfinished thoughts") while maintaining credibility
- **BLUF approach**: Start with key findings, follow with context, end with actionable recommendations
- **Problem-solution framework**: Identify challenge → technical analysis → practical examples → mitigation strategies
- **Focus areas**: AI/GenAI security, low-code/no-code security, Microsoft 365 ecosystem, "democratization risks"
- **Key terminology**: "promptware", "remote copilot execution", "citizen developers", "living-off-the-land"
- **Characteristic phrases**: "without paying for it in security incidents", "the elephant in the room"
- **Tone**: Professional yet approachable, collaborative ("we"), attacker perspective, emphasize "what to do about it"