---
title: "Git 日常使用指南"
slug: "git-guide"
publishedAt: "2026-07-28"
summary: "一套够用的 Git 工作流：从初始化并发布到 GitHub，到日常提交、分支协作、Stash 和冲突处理。"
tags: ["git", "github", "vscode"]
---

# Git 日常使用指南

Git 的命令很多，但日常开发真正高频的只有一小部分。先记住这条主线：

```text
修改文件 → git add → git commit → git push
```

- 工作区：正在编辑、还没有暂存的修改。
- 暂存区：通过 `git add` 选中、准备放进下一次提交的修改。
- 本地仓库：已经执行 `git commit` 的历史记录。
- 远程仓库：通过 `git push` 上传到 GitHub 的提交。

## 第一次使用 Git

先配置提交者信息，这台电脑只需要设置一次：

```powershell
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

项目中如果有 `.env`、密钥、构建产物或依赖目录，应先写入 `.gitignore`，再执行 `git add`。

## 把本地项目发布到 GitHub

先在 GitHub 创建一个空仓库，不要勾选自动创建 README、License 或 `.gitignore`。然后在项目目录运行：

```powershell
# 初始化仓库，并把默认分支命名为 main
git init -b main

# 检查即将纳入版本控制的文件
git status

# 暂存并创建第一次提交
git add .
git commit -m "chore: initial commit"

# 连接 GitHub 仓库，请替换成自己的地址
git remote add origin https://github.com/your-name/your-repo.git

# 首次推送，并建立本地 main 与远程 main 的关联
git push -u origin main
```

用下面的命令确认远程地址：

```powershell
git remote -v
```

## 日常提交

不要一上来就提交，先确认改了什么：

```powershell
git status
git diff
```

然后只暂存本次提交需要的文件：

```powershell
git add src/example.ts
git diff --staged
git commit -m "feat: add example feature"
git push
```

如果确认当前所有修改都属于同一次提交，也可以使用 `git add .`。

常见的提交类型：

- `feat`：新功能
- `fix`：修复问题
- `docs`：文档变更
- `refactor`：不改变功能的代码整理
- `chore`：依赖、构建或工具调整

提交信息应说明“这次修改完成了什么”，例如：

```powershell
git commit -m "fix: handle empty search results"
```

## 使用分支开发

多人协作或开发独立功能时，不要直接在 `main` 上修改。先更新主分支，再创建功能分支：

```powershell
git switch main    #切换到 main 分支
git pull 
git switch -c feature/search   #创建并切换到新分支
```

完成修改后提交并首次推送：

```powershell
git add .
git commit -m "feat: add search"
git push -u origin feature/search
```

接着在 GitHub 创建 Pull Request：

1. `base` 选择 `main`。
2. `compare` 选择 `feature/search`。
3. 检查文件变更，填写标题和说明。
4. 创建 Pull Request，等待检查或合并。

合并完成后更新本地 `main`，并删除已经完成的本地分支：

```powershell
git switch main
git pull --ff-only
git branch -d feature/search
```

## Stage 和 Stash 不是一回事

| 操作 | 命令 | 用途 |
| --- | --- | --- |
| 暂存 | `git add` | 选择哪些修改进入下一次提交 |
| 储藏 | `git stash` | 临时收起未完成的修改，让工作区恢复干净 |

当 Git 提示本地修改会阻止切换分支或合并时，只执行 `git add` 并不能解决问题，因为修改仍然没有提交。暂时不想提交时，可以使用 Stash：

```powershell
# -u 会把尚未跟踪的新文件也一起储藏
git stash push -u -m "WIP: search page"

git switch main
# 在这里处理其他任务

git switch feature/search
git stash pop
```

查看所有储藏：

```powershell
git stash list
```

如果担心恢复失败，使用 `apply` 会保留 Stash 副本：

```powershell
git stash apply 'stash@{0}'
```

确认修改已经恢复后，再删除对应副本：

```powershell
git stash drop 'stash@{0}'
```

## 把 main 的更新合并到当前分支

先确保工作区已经提交或储藏，然后在功能分支执行：

```powershell
git fetch origin
git merge origin/main
```

`fetch` 只更新远程分支信息，不会直接修改当前文件；`merge` 才会把 `origin/main` 合并进当前分支。

## 处理冲突

发生冲突时，Git 会在文件中标记双方内容：

```text
<<<<<<< HEAD
当前分支的内容
=======
要合并进来的内容
>>>>>>> origin/main
```

处理步骤：

1. 决定最终保留的内容，删除冲突标记。
2. 检查是否还有未解决的文件。
3. 暂存解决后的文件并提交。

```powershell
git status
git add path/to/conflicted-file
git commit -m "merge: resolve conflicts"
```

如果不想继续本次合并，可以在提交前执行：

```powershell
git merge --abort
```

## 三个常用撤销操作

取消暂存，但保留文件修改：

```powershell
git restore --staged path/to/file
```

丢弃尚未提交的文件修改：

```powershell
git restore path/to/file
```

这个操作会直接丢失本地修改，执行前先确认文件不再需要。

修改最近一次尚未推送的提交信息：

```powershell
git commit --amend -m "fix: correct commit message"
```

如果提交已经推送并被其他人使用，不要随意改写历史。

## 在 VS Code 中操作

VS Code 的 Source Control 面板对应相同的 Git 流程：

- `Changes` 旁边的 `+`：执行 `git add`。
- `Staged Changes`：下一次提交将包含的内容。
- `Commit`：执行 `git commit`。
- 左下角分支名：查看、切换或创建分支。
- 命令面板中的 `Git: Stash (Include Untracked)`：相当于 `git stash -u`。
- `Pop Latest Stash`：相当于 `git stash pop`。

不管使用界面还是命令行，提交前都建议先查看变更，避免把 `.env`、密钥或无关文件一起推送。

## 最后记住

大多数时候只需要：

```powershell
git status
git add path/to/file
git commit -m "说明这次修改"
git push
```

需要切换任务时使用 Stash，需要协作时使用分支和 Pull Request。先确认状态、再执行命令，比记住大量不常用选项更重要。
