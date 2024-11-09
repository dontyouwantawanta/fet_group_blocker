# Code Broken

While this code does work, about halfway through the 3rd page of members you're account will trigger FetLife's security mechanisms and lock your account. First offense is 15min, second is 2hrs. USE AT YOUR OWN RISK.

## Want to block all users of a group on FetLife?

Sometimes theres a whole group of people on fetlife who you don't wish to interact with. Maybe a few hundred. Unfortunately, blocking them all by hand is VERY time consuming. This project was designed to run in the browser.

## How do I do it

1. Using a browser (tested only on Google Chrome) login to Fetlife **in a different tab than the one on this page**.
2. Now visit the group you want to block all users from. Click on the Members tab. ![image](https://github.com/user-attachments/assets/5155c6db-018b-45cc-8cd2-353ee218a615)

3. Press the `F12` key on your keyboard to open the console, make sure to click Console. ![image](https://github.com/user-attachments/assets/398d2cb7-7f8c-4288-9d2c-29395ceff400)

4. In another tab, open https://raw.githubusercontent.com/dontyouwantawanta/fet_group_blocker/refs/heads/main/blocker.js and copy all of the content.
5. Paste it in the Google Chrome Console and hit `enter`. ![image](https://github.com/user-attachments/assets/0634ad59-6254-4c17-946d-c66376126de9)

  1. If you are prompted to type `allow pasting` first, type that in. You may need to paste and hit `enter` again.
7. Watch as the script loops through each page of the group and blocks each user!
8. When it starts doing error type things, you can close the tab to stop the code from running. You've locked yourself out, but at least you blocked ~50 people!
