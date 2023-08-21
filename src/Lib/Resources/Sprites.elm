module Lib.Resources.Sprites exposing (getResourcePath, allTexture)

{-|


# Textures

@docs getResourcePath, allTexture

-}


{-| Get the path of the resource.
-}
getResourcePath : String -> String
getResourcePath x =
    "assets/" ++ x


{-| allTexture

A list of all the textures.

Add your textures here. Don't worry if your list is too long. You can split those resources according to their usage.

-}
allTexture : List ( String, String )
allTexture =
    [ ( "tile", getResourcePath "img/tiles/tile.png" )
    , ( "enemy_test", getResourcePath "img/scientist/enemy_test.png" )
    , ( "logo", getResourcePath "img/logo.png" )
    , ( "title_bg", getResourcePath "img/title_bg.png" )
    , ( "button_start_0", getResourcePath "img/button_start_0.png" )
    , ( "button_start_1", getResourcePath "img/button_start_1.png" )
    , ( "button_rules_0", getResourcePath "img/button_rules_0.png" )
    , ( "button_rules_1", getResourcePath "img/button_rules_1.png" )
    , ( "button_resume_0", getResourcePath "img/button_resume_0.png" )
    , ( "button_resume_1", getResourcePath "img/button_resume_1.png" )
    , ( "button_quit_0", getResourcePath "img/button_quit_0.png" )
    , ( "button_quit_1", getResourcePath "img/button_quit_1.png" )
    , ( "enemy_1", getResourcePath "img/enemies/enemy_1.png" )
    , ( "enemy_2", getResourcePath "img/enemies/enemy_2.png" )
    , ( "enemy_3", getResourcePath "img/enemies/enemy_3.png" )
    , ( "enemy_4", getResourcePath "img/enemies/enemy_4.png" )
    , ( "enemy_5", getResourcePath "img/enemies/enemy_5.png" )
    , ( "shooter", getResourcePath "img/weapons/shooter.png" )
    , ( "saber", getResourcePath "img/weapons/saber.png" )
    , ( "elite_1", getResourcePath "img/enemies/elite_1/idle/tile000.png" )
    , ( "elite_2", getResourcePath "img/enemies/elite_1/idle/tile001.png" )
    , ( "elite_3", getResourcePath "img/enemies/elite_1/blink/tile008.png" )
    , ( "elite_4", getResourcePath "img/enemies/elite_1/blink/tile009.png" )
    , ( "elite_d1", getResourcePath "img/enemies/elite_1/die/tile056.png" )
    , ( "elite_d2", getResourcePath "img/enemies/elite_1/die/tile057.png" )
    , ( "elite_d3", getResourcePath "img/enemies/elite_1/die/tile058.png" )
    , ( "elite_d4", getResourcePath "img/enemies/elite_1/die/tile059.png" )
    , ( "elite_d5", getResourcePath "img/enemies/elite_1/die/tile060.png" )
    , ( "elite_d6", getResourcePath "img/enemies/elite_1/die/tile061.png" )
    , ( "elite_d7", getResourcePath "img/enemies/elite_1/die/tile062.png" )
    , ( "elite_d8", getResourcePath "img/enemies/elite_1/die/tile063.png" )
    , ( "scientist", getResourcePath "img/scientist/scientist.png" )
    , ( "scientist_walking_1", getResourcePath "img/scientist/scientist_walking_1.png" )
    , ( "scientist_walking_2", getResourcePath "img/scientist/scientist_walking_2.png" )
    , ( "scientist_walking_3", getResourcePath "img/scientist/scientist_walking_3.png" )
    , ( "scientist_walking_4", getResourcePath "img/scientist/scientist_walking_4.png" )
    , ( "scientist_walking_5", getResourcePath "img/scientist/scientist_walking_5.png" )
    , ( "scientist_walking_6", getResourcePath "img/scientist/scientist_walking_6.png" )
    , ( "scientist_jumpingup_1", getResourcePath "img/scientist/scientist_jumpingup_1.png" )
    , ( "scientist_jumpingup_2", getResourcePath "img/scientist/scientist_jumpingup_2.png" )
    , ( "scientist_jumpingtop", getResourcePath "img/scientist/scientist_jumpingtop.png" )
    , ( "scientist_jumpingdown", getResourcePath "img/scientist/scientist_jumpingdown.png" )
    , ( "scientist_landingbuffer_1", getResourcePath "img/scientist/scientist_landingbuffer_1.png" )
    , ( "scientist_landingbuffer_2", getResourcePath "img/scientist/scientist_landingbuffer_2.png" )
    , ( "tile_1", getResourcePath "img/tiles/tile_1.png" )
    , ( "tile_2", getResourcePath "img/tiles/tile_2.png" )
    , ( "tile_3", getResourcePath "img/tiles/tile_3.png" )
    , ( "tile_5", getResourcePath "img/tiles/tile_5.png" )
    , ( "tile_7", getResourcePath "img/tiles/tile_7.png" )
    , ( "tile_9", getResourcePath "img/tiles/tile_9.png" )
    , ( "tile_11", getResourcePath "img/tiles/tile_11.png" )
    , ( "tile_13", getResourcePath "img/tiles/tile_13.png" )
    , ( "tile_15", getResourcePath "img/tiles/tile_15.png" )
    , ( "tile_17", getResourcePath "img/tiles/tile_17.png" )
    , ( "tile_19", getResourcePath "img/tiles/tile_19.png" )
    , ( "tile_21", getResourcePath "img/tiles/tile_21.png" )
    , ( "tile_23", getResourcePath "img/tiles/tile_23.png" )
    , ( "tile_25", getResourcePath "img/tiles/tile_25.png" )
    , ( "tile_27", getResourcePath "img/tiles/tile_27.png" )
    , ( "tile_29", getResourcePath "img/tiles/tile_29.png" )
    , ( "tile_31", getResourcePath "img/tiles/tile_31.png" )
    , ( "tile_33", getResourcePath "img/tiles/tile_33.png" )
    , ( "tile_35", getResourcePath "img/tiles/tile_35.png" )
    , ( "tile_37", getResourcePath "img/tiles/tile_37.png" )
    , ( "tile_39", getResourcePath "img/tiles/tile_39.png" )
    , ( "tile_41", getResourcePath "img/tiles/tile_41.png" )
    , ( "tile_43", getResourcePath "img/tiles/tile_43.png" )
    , ( "tile_45", getResourcePath "img/tiles/tile_45.png" )
    , ( "tile_47", getResourcePath "img/tiles/tile_47.png" )
    , ( "tile_49", getResourcePath "img/tiles/tile_49.png" )
    , ( "tile_51", getResourcePath "img/tiles/tile_51.png" )
    , ( "tile_53", getResourcePath "img/tiles/tile_53.png" )
    , ( "tile_55", getResourcePath "img/tiles/tile_55.png" )
    , ( "tile_57", getResourcePath "img/tiles/tile_57.png" )
    , ( "tile_59", getResourcePath "img/tiles/tile_59.png" )
    , ( "tile_61", getResourcePath "img/tiles/tile_61.png" )
    , ( "tile_63", getResourcePath "img/tiles/tile_63.png" )
    , ( "tile_65", getResourcePath "img/tiles/tile_65.png" )
    , ( "tile_67", getResourcePath "img/tiles/tile_67.png" )
    , ( "tile_69", getResourcePath "img/tiles/tile_69.png" )
    , ( "tile_71", getResourcePath "img/tiles/tile_71.png" )
    , ( "tile_73", getResourcePath "img/tiles/tile_73.png" )
    , ( "tile_75", getResourcePath "img/tiles/tile_75.png" )
    , ( "tile_77", getResourcePath "img/tiles/tile_77.png" )
    , ( "tile_79", getResourcePath "img/tiles/tile_79.png" )
    , ( "tile_81", getResourcePath "img/tiles/tile_81.png" )
    , ( "tile_83", getResourcePath "img/tiles/tile_83.png" )
    , ( "tile_85", getResourcePath "img/tiles/tile_85.png" )
    , ( "tile_87", getResourcePath "img/tiles/tile_87.png" )
    , ( "tile_89", getResourcePath "img/tiles/tile_89.png" )
    , ( "tile_91", getResourcePath "img/tiles/tile_91.png" )
    , ( "tile_93", getResourcePath "img/tiles/tile_93.png" )
    , ( "tile_95", getResourcePath "img/tiles/tile_95.png" )
    , ( "tile_97", getResourcePath "img/tiles/tile_97.png" )
    , ( "tile_99", getResourcePath "img/tiles/tile_99.png" )
    , ( "tile_101", getResourcePath "img/tiles/tile_101.png" )
    , ( "tile_103", getResourcePath "img/tiles/tile_103.png" )
    , ( "tile_105", getResourcePath "img/tiles/tile_105.png" )
    , ( "bullet_player", getResourcePath "img/bullets/playerb.png" )
    , ( "bullet_enemy0", getResourcePath "img/bullets/enemyb0.png" )
    , ( "bullet_enemy1", getResourcePath "img/bullets/enemyb1.png" )
    , ( "bullet_enemy2", getResourcePath "img/bullets/enemyb2.png" )
    , ( "bullet_enemy3", getResourcePath "img/bullets/enemyb3.png" )
    , ( "store", getResourcePath "img/tiles/store.png" )
    , ( "small_health_potion", getResourcePath "img/potion/small_health_potion.png" )
    , ( "medium_health_potion", getResourcePath "img/potion/medium_health_potion.png" )
    , ( "large_health_potion", getResourcePath "img/potion/large_health_potion.png" )
    , ( "speed_potion", getResourcePath "img/potion/speed_potion.png" )
    , ( "speed_potion_none", getResourcePath "img/potion/speed_potion_none.png" )
    , ( "atk_potion", getResourcePath "img/potion/atk_potion.png" )
    , ( "atk_potion_none", getResourcePath "img/potion/atk_potion_none.png" )
    , ( "port", getResourcePath "img/tiles/port.png" )
    , ( "rules", getResourcePath "img/Rules_page.png" )
    , ( "back", getResourcePath "img/back.png" )
    , ( "chip_doubletrigger", getResourcePath "img/chips/chip_doubletrigger.png" )
    , ( "chip_scatter", getResourcePath "img/chips/chip_scatter.png" )
    , ( "chip_splash", getResourcePath "img/chips/chip_splash.png" )
    , ( "chip_empty", getResourcePath "img/chips/chip_empty.png" )
    , ( "coin_gold_1", getResourcePath "img/chips/coin_gold_1.png" )
    , ( "coin_gold_2", getResourcePath "img/chips/coin_gold_2.png" )
    , ( "coin_gold_3", getResourcePath "img/chips/coin_gold_3.png" )
    , ( "coin_gold_4", getResourcePath "img/chips/coin_gold_4.png" )
    , ( "coin_gold_5", getResourcePath "img/chips/coin_gold_5.png" )
    , ( "coin_silver_1", getResourcePath "img/chips/coin_silver_1.png" )
    , ( "coin_silver_2", getResourcePath "img/chips/coin_silver_2.png" )
    , ( "coin_silver_3", getResourcePath "img/chips/coin_silver_3.png" )
    , ( "coin_silver_4", getResourcePath "img/chips/coin_silver_4.png" )
    , ( "coin_silver_5", getResourcePath "img/chips/coin_silver_5.png" )
    , ( "upgrade_menu", getResourcePath "img/upgradeMenu.png" )
    , ( "instruction", getResourcePath "img/instruction.png" )
    , ( "key_r", getResourcePath "img/keys/key_r.png" )
    , ( "press_enter_to_skip", getResourcePath "img/press_enter_to_skip.png" )
    , ( "hp_bar", getResourcePath "img/hp_bar.png" )
    ]
