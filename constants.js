var RabbitRunGame;
(function (RabbitRunGame) {
    var Constants = (function () {
        function Constants() {
        }
        return Constants;
    }());
    Constants.GAME_ALL_LEVELS = {
        MIN_GAME_WIDTH: 480,
        MIN_GAME_HEIGHT: 270,
        MAX_GAME_WIDTH: 1920,
        MAX_GAME_HEIGHT: 1080,
        GRAVITY_Y: 600
    };
    Constants.GAME_LEVEL1 = {
        FRAME_COIN: 27,
        FRAME_RUBY: 14,
        FRAME_CARROT: 10,
        FRAME_SNAKE: 16,
        FRAME_TURTLE: 17,
        FRAMES_WATER: [9, 15, 21],
        FRAME_GATE: 28,
        BACKGROUND_SPEED: 0.7,
        PLAYER_START_X: 300,
        PLAYER_START_Y: 200,
        PLAYER_SPEED: 190,
        PLAYER_JUMP_HEIGHT: -400,
        PLAYER_DOUBLE_JUMP_HEIGHT: -200,
        JUMP_TIME_MARGIN: 250,
        SHOOT_TIME: 0,
        LIFES_COUNT: 3,
        SNAKES_SPEED: -250,
        TURTLES_SPEED: -100,
        CARROT_SCORE: 10,
        COIN_SCORE: 50,
        LIFE_SCORE: 100,
        TOTAL_LEVEL_TIME_SCORE: 3000,
        SUBTRACT_TIME_SCORE: 10,
    };
    RabbitRunGame.Constants = Constants;
})(RabbitRunGame || (RabbitRunGame = {}));
window.onload = function () {
};
//# sourceMappingURL=constants.js.map