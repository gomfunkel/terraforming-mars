import { expect } from "chai";
import { Revolution } from "../../src/turmoil/globalEvents/Revolution";
import { Player } from "../../src/Player";
import { Color } from "../../src/Color";
import { Game } from '../../src/Game';
import { Turmoil } from '../../src/turmoil/Turmoil';
import { Kelvinists } from '../../src/turmoil/parties/Kelvinists';
import { Sponsors } from "../../src/cards/Sponsors";

describe("Revolution", function () {
    it("resolve play", function () {
        const card = new Revolution();
        const player = new Player("test", Color.BLUE, false);
        const player2 = new Player("test2", Color.RED, false);
        const game = new Game("foobar", [player,player2], player);
        const turmoil = new Turmoil(game);
        turmoil.initGlobalEvent(game);
        player.playedCards.push(new Sponsors());
        player2.playedCards.push(new Sponsors());
        turmoil.chairman = player2;
        turmoil.dominantParty = new Kelvinists();
        turmoil.dominantParty.partyLeader = player2;
        
        turmoil.dominantParty.delegates.push(player2);
        card.resolve(game, turmoil);
        expect(player.getTerraformRating()).to.eq(19);
        expect(player2.getTerraformRating()).to.eq(18);
    });
});