# Deployment Strategy Guide

## Overview

The deployment pipeline now supports multiple deployment strategies with environment-based deployments.

## Deployment Triggers

### 1. Production Deployments (Tag: X.Y.Z)

**Trigger:** Push a tag matching semantic versioning `X.Y.Z` (e.g., `1.0.0`, `2.1.5`)

**Flow:**
```
Tag X.Y.Z → CI (build-artifacts.yml) → CD (deploy-artifacts.yml) → Production Environment
```

**Example:**
```bash
git tag 1.0.0
git push origin 1.0.0
```

### 2. Dev Deployments (Tag: X.Y.Z-rc-NNNN)

**Trigger:** Push a tag matching RC pattern `X.Y.Z-rc-NNNN` (e.g., `1.0.0-rc-0001`)

**Flow:**
```
Tag X.Y.Z-rc-NNNN → CI (build-artifacts.yml) → CD (deploy-artifacts.yml) → Dev Environment
```

**Example:**
```bash
git tag 1.0.0-rc-0001
git push origin 1.0.0-rc-0001
```

### 3. Manual Deployment (Workflow Dispatch)

**Trigger:** Manually trigger the CD workflow from GitHub Actions UI

**Options:**
- **Environment:** Choose `production` or `dev`
- **Artifact Source:** Choose one of:
  - `run_id`: Deploy all artifacts from a specific workflow run
  - `backend_artifact_id` + `frontend_artifact_id`: Deploy specific artifacts by ID

**Use Cases:**
- Redeploy existing artifacts to a different environment
- Deploy a mix of artifacts from different runs
- Rollback to previous versions

**How to trigger:**
1. Go to Actions → Deploy Artifacts workflow
2. Click "Run workflow"
3. Select target environment
4. Provide run_id OR artifact IDs
5. Click "Run workflow"

## Finding Artifact/Run IDs

### Get Run ID
From GitHub UI:
```
https://github.com/JraillardGithub/parkndeploy/actions/runs/1234567890
                                                           ^^^^^^^^^^
                                                           This is the run_id
```

### Get Artifact IDs
Using GitHub CLI:
```bash
# List all artifacts
gh api /repos/JraillardGithub/parkndeploy/actions/artifacts

# List artifacts from specific run
gh api /repos/JraillardGithub/parkndeploy/actions/runs/RUN_ID/artifacts
```

## Environment Setup Requirements

Make sure you have both environments configured in GitHub:
1. Go to Settings → Environments
2. Create `production` environment (if not exists)
3. Create `dev` environment (if not exists)
4. Configure environment secrets/variables for each:
   - `AZURE_CLIENT_ID`
   - `AZURE_TENANT_ID`
   - `AZURE_SUBSCRIPTION_ID`
   - `AZURE_REGION`
   - `AZURE_SWA_REGION`

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Deployment Workflow                       │
│                  (deploy-artifacts.yml)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Triggers:                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Push RC Tag (X.Y.Z-rc-NNNN) → Dev                │   │
│  │ 2. Workflow Call (from CI) → Environment param       │   │
│  │ 3. Manual Trigger → Choose environment               │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↓                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Determine Environment Job                    │   │
│  │  • RC tag → dev                                      │   │
│  │  • Manual → user choice                              │   │
│  │  • Workflow call → parameter or default production   │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↓                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Deploy Infrastructure → Target Environment         │   │
│  │  Deploy Backend → Target Environment                │   │
│  │  Deploy Frontend → Target Environment               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      Build Workflow                          │
│                   (build-artifacts.yml)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Triggers:                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • Push Tag X.Y.Z → Production                        │   │
│  │ • Push Tag X.Y.Z-rc-NNNN → Dev                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↓                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Build Backend Artifact                              │   │
│  │  Build Frontend Artifact                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↓                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Determine Environment from Tag Pattern              │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↓                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Call Deploy Workflow with Environment Parameter     │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Benefits

✅ **Environment Isolation:** Dev and production deployments are completely separate  
✅ **Flexible Deployment:** Manual control over what to deploy and where  
✅ **Backward Compatible:** All existing features still work  
✅ **Safe Testing:** Test in dev before promoting to production  
✅ **Rollback Capability:** Easily redeploy previous artifacts  
✅ **Granular Control:** Deploy individual artifacts or complete sets
