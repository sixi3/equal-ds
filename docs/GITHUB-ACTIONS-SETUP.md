# 🚀 **GitHub Actions Auto-Sync Setup**

## 🎯 **What This Achieves**

**True zero-touch automation!** Every time you update design tokens in Token Studio and push to git, everything automatically syncs:

- ✅ **Design tokens** synced from Figma/design files
- ✅ **Storybook controls** automatically generated
- ✅ **Stories** automatically updated with new token options
- ✅ **Changes** automatically committed and pushed
- ✅ **Validation** ensures everything builds correctly

## 🔧 **Setup Requirements**

### **1. GitHub Repository Access**
- Repository must be on GitHub (not GitLab, etc.)
- You need `write` access to the repository
- GitHub Actions must be enabled

### **2. Figma Access (Optional but Recommended)**
- Figma access token for automatic token syncing
- Access to your design files

### **3. Node.js Compatibility**
- Your project must work with Node.js 18+
- All npm scripts must be functional

## 📋 **Step-by-Step Setup**

### **Step 1: Enable GitHub Actions**

1. Go to your GitHub repository
2. Click **Actions** tab
3. Click **Enable Actions** if not already enabled

### **Step 2: Add Figma Access Token (Optional)**

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIGMA_ACCESS_TOKEN`
5. Value: Your Figma personal access token
6. Click **Add secret**

**To get Figma access token:**
1. Go to Figma → Settings → Account → Personal access tokens
2. Click **Create new token**
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token value

### **Step 3: Verify Workflow File**

The workflow file `.github/workflows/auto-sync-tokens.yml` should already be in your repository. If not, create it with the content from the main documentation.

### **Step 4: Test the Workflow**

1. Make a small change to `tokens.json`
2. Commit and push:
   ```bash
   git add tokens.json
   git commit -m "test: trigger auto-sync workflow"
   git push origin main
   ```
3. Go to **Actions** tab to see the workflow running

## 🔄 **How It Works**

### **Trigger Conditions**
The workflow automatically runs when:
- ✅ **Push to main/develop branches**
- ✅ **Changes to token-related files:**
  - `tokens.json`
  - `design-tokens.config.js`
  - `figma-assets/**`
  - `.github/workflows/auto-sync-tokens.yml`
- ✅ **Manual trigger** (workflow_dispatch)

### **Workflow Steps**
1. **🔍 Check for Changes**: Detects if tokens actually changed
2. **📡 Sync Tokens**: Downloads latest from Figma/design files
3. **⚙️ Generate Controls**: Creates latest Storybook controls
4. **📝 Update Stories**: Automatically updates your stories
5. **📝 Commit Changes**: Commits all auto-synced changes
6. **🧪 Validate**: Ensures Storybook builds successfully

### **Smart Detection**
- Only runs when tokens actually change
- Skips unnecessary work if no changes detected
- Handles both Figma sync and local token updates

## 🎮 **Manual Triggers**

### **Force Sync (Even Without Changes)**
1. Go to **Actions** tab
2. Click **🎨 Auto-Sync Design Tokens & Storybook**
3. Click **Run workflow**
4. Check **Force sync even if no token changes**
5. Click **Run workflow**

### **Use Cases for Manual Trigger**
- 🔄 **Weekly maintenance** to ensure everything is in sync
- 🐛 **Debugging** when you suspect token issues
- 🆕 **New components** that need fresh token sync
- 🔧 **Manual token updates** that bypass Figma

## 📊 **Workflow Status & Monitoring**

### **Success Indicators**
- ✅ **Green checkmark** = Everything synced successfully
- ✅ **Auto-commit** = Changes automatically committed
- ✅ **Storybook builds** = Validation passed

### **Failure Indicators**
- ❌ **Red X** = Something went wrong
- ⚠️ **Yellow warning** = Partial success with warnings
- 🔄 **Running** = Currently processing

### **Common Issues & Solutions**

#### **Issue: Workflow Fails on Token Sync**
```bash
# Check if Figma token is valid
npm run tokens:sync

# If it fails locally, it will fail in GitHub Actions
```

#### **Issue: No Changes Detected**
```bash
# Check if tokens actually changed
git diff HEAD~1 HEAD tokens.json

# Force sync manually if needed
# Go to Actions → Run workflow → Check "Force sync"
```

#### **Issue: Build Validation Fails**
```bash
# Test locally first
npm run build-storybook

# Fix any build issues before pushing
```

## 🔒 **Security & Permissions**

### **Repository Secrets**
- `FIGMA_ACCESS_TOKEN`: Only used for token syncing
- `GITHUB_TOKEN`: Automatically provided by GitHub
- No sensitive data exposed in logs

### **File Access**
- Workflow only accesses public repository files
- Cannot access private design files without proper tokens
- Respects repository permissions

### **Branch Protection**
- Workflow can only push to branches you have access to
- Cannot bypass branch protection rules
- Respects repository settings

## 🚀 **Advanced Configuration**

### **Customize Trigger Paths**
Edit `.github/workflows/auto-sync-tokens.yml`:

```yaml
on:
  push:
    branches: [ main, develop, feature/* ]  # Add more branches
    paths:
      - 'tokens.json'
      - 'design-tokens.config.js'
      - 'figma-assets/**'
      - 'src/tokens/**'  # Add custom token paths
      - '.github/workflows/auto-sync-tokens.yml'
```

### **Add More Validation Steps**
```yaml
- name: 🧪 Additional Tests
  run: |
    npm run test
    npm run lint
    npm run typecheck
```

### **Custom Commit Messages**
```yaml
COMMIT_MSG="🎨 Auto-sync: ${{ github.event.head_commit.message }}
- 🔄 Synced design tokens
- ⚙️ Generated controls
- 📝 Updated stories"
```

## 📈 **Performance & Optimization**

### **Caching**
- **npm cache**: Dependencies cached between runs
- **Node modules**: Reused when possible
- **Git history**: Optimized for change detection

### **Parallel Execution**
- Multiple steps can run in parallel
- Optimized for speed and efficiency
- Minimal waiting time

### **Resource Usage**
- **Runner**: Ubuntu latest (2-core, 7GB RAM)
- **Duration**: Typically 2-5 minutes
- **Cost**: Free for public repos, included in GitHub Pro

## 🔍 **Monitoring & Debugging**

### **Workflow Logs**
1. Go to **Actions** tab
2. Click on specific workflow run
3. Click on job name
4. Expand step details for logs

### **Debug Information**
Each step provides detailed output:
- ✅ Success messages
- ⚠️ Warning messages
- ❌ Error messages with context
- 📊 Performance metrics

### **Common Log Patterns**
```bash
🎨 Design tokens changed - will sync everything
✅ Tokens synced
✅ Controls generated
✅ Stories updated
🔄 Changes detected - will commit
✅ Changes committed and pushed
✅ Storybook builds successfully
🎉 AUTO-SYNC COMPLETE!
```

## 🎯 **Best Practices**

### **1. Regular Token Updates**
- Update tokens in small, logical batches
- Push changes regularly (not all at once)
- Test locally before pushing

### **2. Monitor Workflow Health**
- Check Actions tab regularly
- Address failures promptly
- Use manual triggers for testing

### **3. Token Organization**
- Keep tokens well-structured
- Use consistent naming conventions
- Document token purposes

### **4. Team Communication**
- Inform team about auto-sync workflow
- Coordinate major token changes
- Use meaningful commit messages

## 🚨 **Troubleshooting**

### **Workflow Won't Trigger**
- ✅ Check file paths in trigger configuration
- ✅ Ensure changes are to specified files
- ✅ Verify branch names match
- ✅ Check GitHub Actions is enabled

### **Token Sync Fails**
- ✅ Verify Figma access token is valid
- ✅ Check Figma file permissions
- ✅ Test locally with `npm run tokens:sync`
- ✅ Check network connectivity

### **Build Validation Fails**
- ✅ Test locally with `npm run build-storybook`
- ✅ Check for syntax errors in stories
- ✅ Verify all dependencies are installed
- ✅ Check Node.js version compatibility

### **No Changes Committed**
- ✅ Check if tokens actually changed
- ✅ Verify git configuration in workflow
- ✅ Check repository permissions
- ✅ Use manual trigger to test

## 🎉 **Success Indicators**

When everything is working correctly, you'll see:

1. **🔄 Automatic Workflow**: Runs on every token push
2. **✅ Successful Sync**: All steps complete successfully
3. **📝 Auto-Commit**: Changes automatically committed
4. **🧪 Validation Pass**: Storybook builds successfully
5. **🎯 Zero Manual Work**: Everything happens automatically

## 🚀 **Next Steps**

1. **Test the workflow** with a small token change
2. **Monitor performance** and adjust if needed
3. **Train your team** on the new workflow
4. **Enjoy zero-touch automation!** 🎊

---

**Need help?** Check the workflow logs, test locally, or use manual triggers for debugging!
