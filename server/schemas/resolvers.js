const { Profile } = require('../models');

const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find();
        },

        profile: async (parent, { profileId }) => {
            return Profile.findOne({ _id: profileId });
        },
    },

    Mutation: {
        addProfile: async (parent, { name }) => {
            return Profile.create({ name });
        },
        addSkill: async (parent, { profileId, skill }) => {
            return Profile.findOneAndUpdate(
                // Finds profile with this id
                { _id: profileId },
                // Add the skill we pass in to the "skills" array
                { $addToSet: { skills: skill } },
                // return the new value
                { new: true, runValidators: true },
            );
        },
    },
};

module.exports = resolvers;