# Commit suggestions and git commands

Recommended commits (ít nhất 3):

1) Add initial PBT_02 files
```bash
git add PBT_02/answers.md PBT_02/validation_test.html PBT_02/register.html PBT_02/media.html PBT_02/checkout.html
git commit -m "PBT02: add answers and initial HTML exercises (validation, register, media, checkout)"
```

2) Add screenshots placeholder and video instructions
```bash
git add PBT_02/screenshots/ PBT_02/videos/README.md PBT_02/validation_and_w3_instructions.md
git commit -m "PBT02: add screenshots folder, video instructions and validation guide"
```

3) Polish forms and accessibility fixes
```bash
git add PBT_02/register.html
git commit -m "PBT02: improve register form placeholders, labels and select placeholders"
```

Push:
```bash
git push origin YOUR_BRANCH
```

Replace `YOUR_BRANCH` with your working branch (e.g., `main` or `pbt02`).
