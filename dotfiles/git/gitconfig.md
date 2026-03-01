```shell
[user]
	name = [NAME]
	email = [EMAIL_ADDRESS]
	signingkey = ~/.ssh/[PUB_KEY_NAME]

[commit]
	gpgsign = true

[gpg]
	format = ssh

[gpg "ssh"]
	program = /Applications/1Password.app/Contents/MacOS/op-ssh-sign

[filter "lfs"]
	smudge = git-lfs smudge -- %f
	process = git-lfs filter-process
	required = true
	clean = git-lfs clean -- %f
```