# ------------------------------------------------------------------------------
# Mac Helpers
# ------------------------------------------------------------------------------

alias showFiles='defaults write com.apple.finder AppleShowAllFiles YES; killall Finder /System/Library/CoreServices/Finder.app'
alias hideFiles='defaults write com.apple.finder AppleShowAllFiles NO; killall Finder /System/Library/CoreServices/Finder.app'
alias sortApps="defaults write com.apple.dock ResetLaunchPad -boolean true; killall Dock"
alias addDockSpacer="defaults write com.apple.dock persistent-apps -array-add '{\"tile-type\"=\"spacer-tile\";}'; killall Dock"
