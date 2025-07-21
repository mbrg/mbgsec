---
title: "Link Archive Integration: From Submodules to GitHub Actions"
date: 2025-07-21
categories: [Development]
tags: [Jekyll, GitHub Actions, DevOps, Integration]
---

# Link Archive Integration Complete

Successfully integrated [link-archive repository](https://github.com/mbrg/link-archive) into mbgsec.com using GitHub Actions and Jekyll collections, maintaining existing workflows while providing unified theming.

## Why This Approach (Dave Farley Approved ✅)

**The Problem**: Content scattered between repositories, inconsistent theming, complex deployment

**The Solution**: GitHub Actions + Jekyll Collections
- ✅ **Simple**: Direct repo cloning, no submodule complexity  
- ✅ **Reliable**: GitHub Actions handle automation consistently
- ✅ **Fast**: Single build pipeline (~4 seconds)
- ✅ **Maintainable**: Clear workflow, easy to debug

## Final Architecture

```mermaid
graph TD
    A[link-archive repo] -->|GitHub Action| B[Clone to .tmp/]
    B --> C[Copy archive/*.md → _archive/]
    B --> D[Copy weblog/*.md → _weblog/]
    C --> E[Jekyll Build]
    D --> E
    E --> F[Deploy to mbgsec.com]
    F --> G[/archive/ pages]
    F --> H[/weblog/ pages] 
    F --> I[RSS feeds]
```

**Key Decision**: Removed git submodule approach - GitHub Actions clone directly, eliminating complexity.

## Implementation Summary

### Jekyll Configuration
- **Collections**: `archive` and `weblog` with consistent permalinks
- **RSS Feeds**: Separate feeds for posts, weblog, and archive
- **Navigation**: Replaced linklog with weblog in menu
- **Footer**: Added RSS feed links for discoverability

### GitHub Actions Workflow
- **Triggers**: Repository dispatch, manual, and daily schedule
- **Process**: Clone link-archive → Copy files → Build Jekyll → Commit changes
- **Smart**: Only commits when changes detected

### Success Criteria Met
1. ✅ Archive content at `/archive/`
2. ✅ Weblog content at `/weblog/`  
3. ✅ Consistent minimal-mistakes theming
4. ✅ Separate RSS feeds generated automatically
5. ✅ Existing link-archive workflow preserved
6. ✅ No breaking changes to mbgsec.com
7. ✅ Fast, reliable deployment

## Original Integration Plan

The integration followed a planned approach with three alternatives considered:

**Alternative 1 (Rejected)**: Direct collection migration
- Would require dismantling existing automation
- Complex workflow changes

**Alternative 2 (Initially Chosen)**: Git submodule integration  
- Started with submodules for content separation
- Jekyll plugin for file copying
- Discovered GitHub Pages safe mode blocks plugins

**Alternative 3 (Rejected)**: Microservice architecture
- Added complexity without clear benefits
- Multiple deployment pipelines

**Final Solution**: GitHub Actions + Direct Cloning
- Evolved from Alternative 2 when submodules proved unnecessary
- Simpler than submodules, more reliable than plugins
- Perfect fit for GitHub Pages constraints

## Technical Decisions Explained

### Why GitHub Actions Over Jekyll Plugins
**Problem**: `github-pages` gem enforces safe mode, blocks custom plugins
**Solution**: GitHub Actions work within GitHub Pages constraints
**Result**: Automated, reliable, maintainable

### Why No Git Submodules  
**Original Thinking**: Submodules provide version tracking and separation
**Reality Check**: Files get copied to collections anyway
**Optimization**: Direct cloning is simpler, achieves same result

### Why Replace Linklog with Weblog
**Alignment**: Matches link-archive terminology  
**Clarity**: Better semantic meaning (web-log vs link-log)
**UX**: Single menu item for processed content

### Why Escape Liquid Syntax in Archive Content
**Problem**: Archive markdown files contain literal `{{` and `{%` characters (e.g., `{{DoomArena: A Framework...}}`)
**Jekyll Issue**: Liquid templating engine tries to parse these as template syntax and fails with "Tag was not properly terminated"
**Solution**: Wrap content (not front matter) in `{% raw %}...{% endraw %}` tags
**Implementation**: AWK script in GitHub Actions that preserves YAML front matter while escaping content
**Result**: Archive content displays exactly as written while preventing Liquid parsing errors

## File Structure
```
mbgsec/
├── _archive/           # Copied from link-archive/archive/
├── _weblog/           # Copied from link-archive/weblog/  
├── _linklog/          # Preserved existing files
├── .github/workflows/ # Automation
└── devlog/           # This documentation
```

## Lessons Learned

1. **GitHub Pages constraints require creative solutions** - Actions > Plugins
2. **Simpler is better** - Direct cloning > Submodules  
3. **Test early** - Local build testing revealed plugin limitations
4. **Dave Farley principles work** - Simple, reliable, fast, maintainable
5. **Content escaping is critical** - Archive content needs Liquid syntax protection to prevent Jekyll build failures

## Maintenance

**Automated**: GitHub Action handles daily updates
**Manual**: Workflow dispatch available for immediate updates  
**Monitoring**: Build logs provide import visibility
**Scaling**: Architecture supports additional collections

---

*Integration completed: July 21, 2025*  
*Build status: ✅ Successful*  
*Dave Farley approval: ⭐⭐⭐⭐⭐*  
*Architecture: Simple, Reliable, Fast*
