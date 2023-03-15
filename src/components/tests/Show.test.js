import React from 'react';
import { render, fireEvent, screen, getByTestId, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';


const testShow = {
    name: "this Name",
    summary: "this is the summary",
    seasons: [
        {
            id: "1",
            name: "Season One",
            episodes: [
                
            ]
        },
        {
            id: "second",
            name: "Season Two",
            episodes: []
        }
    ]
}

const mockFunction = 

test('renders without errors', () => {
    render(<Show show={testShow} selectedSeason={"none"}/>)
 });

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={"none"}/>)
    const loading = screen.getByTestId("loading-container")
    expect(loading).toBeInTheDocument()
 });

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShow} selectedSeason={"none"}/>)
    const seasonsLength = screen.getAllByTestId("season-option")
    expect(seasonsLength).toHaveLength(2)
 });

test('handleSelect is called when an season is selected', async () => {
    const handleSelect = jest.fn();
    const user = userEvent.setup();
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect}/>)
    const select = screen.getByLabelText(/Select A Season/i);
    await user.selectOptions(select, ["1"]);
    expect(handleSelect).toBeCalled();
    
 });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={testShow} selectedSeason={"none"}/>)
        const episode = screen.queryByTestId("episodes-container")
        expect(episode).not.toBeInTheDocument()

        rerender(<Show show={testShow} selectedSeason={"1"}/>)
        const newEpisode = screen.queryByTestId("episodes-container");
        expect(newEpisode).toBeInTheDocument();


 });
