# Ryt Bank Assessment - Boon Kerk Zhan

## 🚀 Quick Start

There are two ways to run the app. Choose the one that fits best:

1. Development Server (iOS/Android)
   - You can modify the code and see changes happen live. You'll need to clone the repo for this.
2. APK installation (Android only)
   - Download the app build and install it on your Android phone/emulator.

### 1. Development Server (iOS/Android)

#### Prerequisites

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Run on your device:
   - Install Expo Go app on your device. [AppStore](https://itunes.apple.com/app/apple-store/id982107779) / [PlayStore](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)
   - Scan QR code with your phone and open in Expo Go app. Make sure you are using Expo Go and not development build. (See image)
     ![expo go](assets/images/readme-image.png)
     OR
   - Run on emulator (requires Android Studio / Xcode)
   - Note: FaceId does not work in Expo Go, but will fallback to passcode. To test biometrics, you can use Android.

### 2. APK Installation (Android only)

1. Download the .apk file from [releases](link-to-releases)
2. Install on your Android device (enable "Unknown Sources" in settings)
3. (Optional) Drag .apk file to Android emulator and install there.


## 📱 Project Overview

This is my first time building a mobile app! Coming from web development, the process was eye-opening and I learned a lot, especially about setting up the development environment. You could say the web has it easy!


## 🏗 Key Highlights

### Clear Separation of Concerns

- **UI Components vs. Business Logic**

  - Kept UI components in the `components` folder
  - Put business logic in custom hooks like `useGetBalance` and `useMakeTransfer`

- **Data Layer**
  - Created mock API with fake delays in the `api` folder
  - Used AsyncStorage to save data locally

### App Features

- **Caching**

  - App saves API requests to prevent unnecessary calls
  - Cache gets cleared when new data comes in
  - Added a `Reset Cache` button at the bottom of homepage for testing

- **Type Safety & Form Validation**

  - Used TypeScript throughout for intellisense and improved developer experience
  - Form validation with Zod schemas
  - React Hook Form for handling form inputs
  - Added proper error handling with custom error codes
  - Created clear data types for things like Transaction and Balance

- **Backend Simulation**

  - Added realistic network delays
  - Stored data using AsyncStorage
  - Added a `NUKE` button at the bottom of homepage to reset the database

- **Error Handling**
  - Set up custom error codes and messages
  - Added error states in forms
  - Made sure error messages make sense to users

---

## 🎥 Demo

### Making Payment:


https://github.com/user-attachments/assets/fd49234d-4a74-4705-b64a-a2620bbbe748



### Caching and resetting cache:



https://github.com/user-attachments/assets/8411ed85-e129-406d-8667-88e720afe1c1


### Resetting database:
[ResetDb.webm](https://github.com/user-attachments/assets/491477cd-e813-4808-bf6d-7c26f226e50a)


<video controls style="width: 300px; height: auto;">

  <source src="assets/videos/ResetDb.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

## 🛠 Technology Stack

### Framework

- **Expo**
  - Really easy to get started with as a web developer with good docs
  - File-based routing like Next.js
  - Easy to setup development environment with both Expo Go and dev builds
  - Comes with biometrics built-in

### UI Layer

- **Gluestack with NativeWind**

  - Uses Tailwind CSS style for React Native
  - Since I know web dev, this let me build UI quickly

- **AI Help**
  - Used Claude to get started with UI and basic code
  - My workflow: Ask for basic UI → Get preview → Convert to mobile → Style it up

### Data Management

- **React Query**
  - Handles caching of API requests
  - Ensure server state is synced with application
  - Prevents unnecessary rerenders

### Type Safety & Forms

- **TypeScript + Zod + React Hook Form**
  - 3 best friends of libraries that are battle-tested and used in production apps

### Storage

- **AsyncStorage**
  - Saves data on the device to mimic
  - Does the job for this app demo

---

## 📝 What I Learned & What's Next

### 🧪 Testing

- **Current Gap:** No tests yet
- **Plan:**
  - Add tests for custom hooks
  - Set up integration tests for main features
  - Maybe add Storybook for component testing

### 📐 Code Structure

- **Current Gap:** Basic folder structure that needs work. Still figuring out best practices.
- **Plan:**
  - Look into how big React Native apps are structured
  - Organize features better by folder
  - Make the code more scalable
  - Set up proper deployment pipeline

### 🎨 UI Framework Thoughts

- **Learning:** Gluestack isn't as good as I hoped
  - Styles don't work right with child components even when set up correctly
  - Props are inconsistent (some use `sm`/`md`, others use `small`/`medium`)
- **Future Plan:**
  - Might switch to just NativeWind
  - Check out Unistyles
  - For a real app, probably better to build our own design system

### ⚡ Performance Tracking

- **Current Gap:** Not tracking performance much
- **Plan:**
  - Add performance monitoring
  - Track async operations
  - Watch how React Query cache works
  - Set up error tracking
  - Look into tools like Sentry or Datadog
