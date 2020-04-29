'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('FeedItem', {
      processedUrl: {
            allowNull=true,
            type: Sequelize.STRING
          }
    });
  },
  down: (queryInterface, Sequelize) => {
    //return queryInterface.dropTable('FeedItem');
  }
};