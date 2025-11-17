# Deployment Instructions for 31daysofvibecoding.com

## Quick Start

Your Jekyll site is ready to deploy! Here's what you need to do:

## 1. Enable GitHub Pages

1. Go to your repo: https://github.com/jeffblankenburg/31-days-of-vibe-coding
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` and `/ (root)`
   - Click **Save**

GitHub will automatically build and deploy your site within a few minutes.

## 2. Configure Custom Domain (31daysofvibecoding.com)

### In GitHub:

1. Still in **Settings** → **Pages**
2. Under "Custom domain", enter: `31daysofvibecoding.com`
3. Click **Save**
4. Check the box "Enforce HTTPS" (wait a few minutes for it to become available)

### In Your DNS Provider:

You need to add DNS records for your domain. Add these records in your domain registrar (GoDaddy, Namecheap, etc.):

**Option A: CNAME Record (Recommended)**

| Type | Name | Value |
|------|------|-------|
| CNAME | www | jeffblankenburg.github.io |
| CNAME | @ or 31daysofvibecoding.com | jeffblankenburg.github.io |

**Option B: A Records (Alternative)**

If your DNS provider doesn't support CNAME for apex domain (@), use A records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | jeffblankenburg.github.io |

### DNS Propagation:

DNS changes can take 1-48 hours to propagate fully, but usually work within an hour.

Check status: https://dnschecker.org/#A/31daysofvibecoding.com

## 3. Test Your Site

Once DNS propagates:

- Visit: https://31daysofvibecoding.com
- Should see your homepage
- Click on Day 1 post
- Scroll to bottom, confirm Utterances comments widget loads

## 4. Enable Utterances Comments

The comments are already configured in your post layout, but you need to:

1. Go to: https://github.com/apps/utterances
2. Click **Install**
3. Select **Only select repositories**
4. Choose: `jeffblankenburg/31-days-of-vibe-coding`
5. Click **Install**

Now comments will work! When someone comments, it creates a GitHub Issue in your repo.

## 5. Publishing New Articles

To publish a new article:

1. Create a file in `_posts/` with format: `YYYY-MM-DD-title.md`
2. Add front matter:
   ```yaml
   ---
   layout: post
   title: "Day 3: Your Title Here"
   date: 2025-01-03
   author: Jeff Blankenburg
   excerpt: "Brief excerpt for homepage listing"
   ---
   ```
3. Write your article in Markdown
4. Commit and push to `main` branch
5. GitHub Pages auto-deploys in ~1 minute

## 6. Adding Images

1. Add images to `/images/` directory
2. Reference in posts:
   ```markdown
   ![Alt text](/images/your-image.png)
   ```
3. For header images, add to front matter:
   ```yaml
   header_image: /images/day03-header.jpg
   ```

## Local Development (Optional)

To preview locally before deploying:

```bash
# Install dependencies (one time)
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Troubleshooting

**Site not updating after push?**
- Check Actions tab in GitHub for build errors
- Builds take 30-60 seconds

**DNS not working?**
- Verify records with: `dig 31daysofvibecoding.com`
- Wait longer (DNS can take 24-48 hours)
- Try clearing browser cache

**Comments not showing?**
- Verify Utterances app is installed
- Check browser console for errors
- Make sure repo is public

**404 errors?**
- Verify `_config.yml` baseurl is empty: `baseurl: ""`
- Check post filenames match: `YYYY-MM-DD-title.md`

## GitHub Pages URL Structure

Your site will be available at:
- Main: https://31daysofvibecoding.com
- GitHub: https://jeffblankenburg.github.io/31-days-of-vibe-coding (redirects)

Posts appear at: `/day/post-title/`
Example: https://31daysofvibecoding.com/day/what-is-vibe-coding/

## Next Steps

1. ✅ Push this repo to GitHub
2. ✅ Enable GitHub Pages
3. ✅ Configure custom domain
4. ✅ Install Utterances app
5. ✅ Test site and comments
6. 📝 Write remaining articles in `_posts/`
7. 🖼️ Add images to `/images/`
8. 🚀 Share on social media!

---

**Need help?** Open an issue or check GitHub Pages docs: https://docs.github.com/en/pages
