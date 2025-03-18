const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Performance optimizations
config.maxWorkers = 4;
config.transformer.minifierPath = 'metro-minify-terser';
config.transformer.minifierConfig = {
  compress: {
    drop_console: process.env.NODE_ENV === 'production',
    drop_debugger: true,
  },
};

// Better platform-specific module handling
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Handle web-specific exclusions
  if (platform === 'web') {
    const webExclusions = [
      'react-native-google-mobile-ads',
      // Add other web-incompatible modules here
    ];
    
    if (webExclusions.includes(moduleName)) {
      return {
        type: 'empty',
      };
    }
  }

  // Handle platform-specific module resolution
  const platforms = ['android', 'ios', 'web'];
  if (platforms.includes(platform)) {
    try {
      const platformSpecific = context.resolveRequest(
        context,
        `${moduleName}.${platform}`,
        platform
      );
      if (platformSpecific) {
        return platformSpecific;
      }
    } catch (e) {
      // Fallback to default resolution
    }
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
