import { test, expect } from '@playwright/test';

test('it should play a music', async ({ page }) => {
  const song = {
    id: 1,
    title: "Smells Like Test Script",
    artist: "Nullvana",
    description: "Nullvana",
    image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
    type: "album",
    src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
  }

  await page.route('**/songs', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([song]),
    });
  });

  await page.goto('/')

  const loggedUser = page.locator('.logged-user')
  await expect(loggedUser).toHaveText('Fernando Papito');

  //div[contains(@class, "song")]//h6[text()="Bughium"]/..//button
  await page.click(`//div[contains(@class, "song")]//h6[text()="${song.title}"]/..//button`)
  await page.waitForTimeout(3000)

  const songCard = page.locator('.song').filter({ hasText: song.title })

  const playButton = songCard.locator('.play')
  const pauseButton = songCard.locator('.pause')

  await playButton.click()
  await expect(pauseButton).toBeVisible({ timeout: 2000 })
  await expect(playButton).toBeVisible({ timeout: 7000 })

});

