# ------------------------------------------------------------------------------
# Mac Helpers
# ------------------------------------------------------------------------------

alias showFiles='defaults write com.apple.finder AppleShowAllFiles YES; killall Finder /System/Library/CoreServices/Finder.app'
alias hideFiles='defaults write com.apple.finder AppleShowAllFiles NO; killall Finder /System/Library/CoreServices/Finder.app'
alias sortApps="defaults write com.apple.dock ResetLaunchPad -boolean true; killall Dock"
alias addDockSpacer="defaults write com.apple.dock persistent-apps -array-add '{\"tile-type\"=\"spacer-tile\";}'; killall Dock"

alias finder='open .'
alias home='open "$HOME"'
alias downloads='open "$HOME/Downloads"'
alias desktop='open "$HOME/Desktop"'
alias of='open -a Finder'
alias macinfo='system_profiler SPHardwareDataType'
alias sysinfo='sw_vers && system_profiler SPHardwareDataType'
alias ports='lsof -i -P -n'
alias myip='curl -s https://api.ipify.org && echo'
alias localip="ipconfig getifaddr en0"
alias wifi='networksetup -getinfo Wi-Fi'
alias dnsflush='sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder'
